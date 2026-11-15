import onnxruntime as ort, numpy as np, subprocess, sys, glob, os
from huggingface_hub import hf_hub_download
p=hf_hub_download("Xenova/modnet","onnx/model.onnx")
s=ort.InferenceSession(p,providers=["CPUExecutionProvider"])
inp=s.get_inputs()[0]; print(inp.name,inp.shape, [o.name for o in s.get_outputs()])
def run(t0,t1,out):
    W,H=1080,1920; n=int(round((t1-t0)*30))
    rd=subprocess.Popen(['ffmpeg','-v','error','-ss',str(t0),'-i','union_full.mp4','-frames:v',str(n),'-f','rawvideo','-pix_fmt','rgb24','-'],stdout=subprocess.PIPE)
    wr=subprocess.Popen(['ffmpeg','-v','error','-y','-f','rawvideo','-pix_fmt','rgba','-s',f'{W}x{H}','-r','30','-i','-','-c:v','libvpx-vp9','-pix_fmt','yuva420p','-b:v','6M','-auto-alt-ref','0',out],stdin=subprocess.PIPE)
    import cv2
    for k in range(n):
        b=rd.stdout.read(W*H*3)
        if len(b)<W*H*3: break
        im=np.frombuffer(b,np.uint8).reshape(H,W,3)
        sm=cv2.resize(im,(288,512),interpolation=cv2.INTER_AREA).astype(np.float32)
        x=((sm/255.0-0.5)/0.5).transpose(2,0,1)[None]
        m=s.run(None,{inp.name:x})[0][0,0]
        m=cv2.resize(m,(W,H),interpolation=cv2.INTER_LINEAR)
        m=np.clip((m-0.08)/0.84,0,1)
        rgba=np.dstack([im,(m*255).astype(np.uint8)])
        wr.stdin.write(rgba.tobytes())
    wr.stdin.close(); wr.wait(); print(out,'ok')
for t0,t1,o in [(16.8,22.5,'cut_arm.webm'),(51.5,57.7,'cut_guarda.webm'),(63.5,69.5,'cut_anotador.webm')]:
    run(t0,t1,'remotion/public/'+o)
