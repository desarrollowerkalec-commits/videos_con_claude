import json,subprocess,re
W=json.load(open('words_raw.json'))
def sil(i):
    o=subprocess.run(['ffmpeg','-i',f'raw/c{i}.mp4','-af','silencedetect=n=-35dB:d=0.25','-f','null','-'],capture_output=True,text=True).stderr
    st=[float(x) for x in re.findall(r'silence_start: ([\d.]+)',o)]; en=[float(x) for x in re.findall(r'silence_end: ([\d.]+)',o)]
    return list(zip(st,en))
heads={0:1.33,1:0.60,2:0.88,3:2.0,4:2.40}
segs=[]
for i in range(5):
    ws=W[str(i)]; a=heads[i]; b=ws[-1]['e']+0.12
    cur=a
    for s,e in sil(i):
        if e<=a or s>=b: continue
        if e-s>0.3 and s>a+0.05:
            segs.append((i,cur,s+0.08)); cur=e-0.08
    segs.append((i,cur,b))
segs=[s for s in segs if s[2]-s[1]>0.15]
json.dump(segs,open('segs.json','w'))
tot=sum(e-s for _,s,e in segs); print(len(segs),'segs',round(tot,2),'s')
# filter: alternate zoom 1.0 / 1.35 at each cut
f=[];n=0
for k,(i,s,e) in enumerate(segs):
    z=1.0 if k%2==0 else 1.35
    cw=int(720/z)//2*2; ch=int(1280/z)//2*2; x=(720-cw)//2; y=int(40*(z>1))
    f.append(f"[{i}:v]trim={s}:{e},setpts=PTS-STARTPTS,crop={cw}:{ch}:{x}:{y},scale=1080:1920:flags=lanczos,fps=30,setsar=1[v{k}]")
    f.append(f"[{i}:a]atrim={s}:{e},asetpts=PTS-STARTPTS,afade=t=in:d=0.015,afade=t=out:st={e-s-0.02:.3f}:d=0.02[a{k}]")
f.append("".join(f"[v{k}][a{k}]" for k in range(len(segs)))+f"concat=n={len(segs)}:v=1:a=1[v][a]")
cmd=['ffmpeg','-v','error','-y']+sum([['-i',f'raw/c{i}.mp4'] for i in range(5)],[])+['-filter_complex',';'.join(f),'-map','[v]','-map','[a]','-c:v','libx264','-crf','17','-preset','medium','-c:a','aac','-b:a','192k','union_1-5.mp4']
subprocess.run(cmd,check=True)
