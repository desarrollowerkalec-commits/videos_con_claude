from PIL import Image, ImageFilter
import numpy as np, subprocess, re, sys
from scipy import ndimage as nd
src,box,out=sys.argv[1],tuple(map(int,sys.argv[2].split(','))),sys.argv[3]
im=Image.open(src).convert('RGB'); crop=im.crop(box); W,H=crop.size
big=crop.resize((W*4,H*4),Image.LANCZOS).filter(ImageFilter.GaussianBlur(2.5))
b=np.array(big).astype(float)
cols={'bg':(241,240,236),'brown':(0x47,0x38,0x2F),'leaf':(0xB3,0x69,0x5C),'tan':(0xAF,0x93,0x73),'blue':(0x1B,0x97,0xC8)}
names=list(cols); C=np.array([cols[n] for n in names])
d=((b[:,:,None,:]-C[None,None])**2).sum(3); lab=d.argmin(2); fg=nd.binary_opening(lab!=0,iterations=1)
cores={}
for i in range(1,5):
    cores[i]=nd.binary_opening((lab==i)&(d[:,:,i]<45**2),iterations=3)
T,L=names.index('tan'),names.index('leaf')
cores[T]&=~nd.binary_dilation(cores[L],iterations=16)
core=np.zeros_like(lab)
for i,m in cores.items(): core[m]=i
idx=nd.distance_transform_edt(core==0,return_distances=False,return_indices=True)
full=core[idx[0],idx[1]]; full[~fg]=0
parts=[]
for n in ['tan','brown','leaf','blue']:
    i=names.index(n)
    Image.fromarray(np.where(full==i,0,255).astype(np.uint8)).filter(ImageFilter.MedianFilter(5)).convert('1').save(f'tr/{n}.pbm')
    subprocess.run(['potrace','-s','-t','60','-a','1.15','-O','0.4','--flat','-o',f'tr/{n}.svg',f'tr/{n}.pbm'],check=True)
    s=open(f'tr/{n}.svg').read(); g=re.search(r'(?s)<g transform="([^"]+)"[^>]*>(.*)</g>',s)
    parts.append(f'<g id="{n}" transform="{g.group(1)}" fill="#%02X%02X%02X">{g.group(2)}</g>'%cols[n])
open(out,'w').write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W*4} {H*4}">\n'+'\n'.join(parts)+'\n</svg>\n')
