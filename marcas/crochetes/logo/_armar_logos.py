import re, numpy as np, subprocess, sys
from PIL import Image
OUT=sys.argv[1]
def iso_bbox(png):
    a=np.array(Image.open(png).convert('RGB')).astype(int)
    chroma=a.max(2)-a.min(2); bg=np.abs(a-[241,240,236]).sum(2)>40
    m=bg&(chroma>14)
    ys,xs=np.where(m); return xs.min()-8,ys.min()-8,xs.max()+8,ys.max()+8
def iso_inner(svgfile):
    s=open(svgfile).read(); vb=re.search(r'viewBox="0 0 (\d+) (\d+)"',s); return s[s.index('>',s.index('<svg'))+1:s.rindex('</svg>')], int(vb.group(1)), int(vb.group(2))
for key,src in [('vertical','a'),('horizontal','b')]:
    x0,y0,x1,y1=iso_bbox(f'{src}.png')
    subprocess.run(['python3','-I','trace.py',f'{src}.png',f'{x0},{y0},{x1},{y1}',f'iso_{key}.svg'],check=True)
    inner,vw,vh=iso_inner(f'iso_{key}.svg')
    k=150/1250; px,py,pw=x0*k,y0*k,(x1-x0)*k; sc=pw/vw
    s=open(f'{src}.svg').read()
    defs=re.search(r'(?s)<defs>.*?</defs>',s).group(0)
    glyph_defs=''.join(re.findall(r'(?s)<g id="glyph-[^"]+">.*?</g>',s))
    text=''.join(re.findall(r'(?s)<g fill="rgb\(0%, 0%, 0%\)" fill-opacity="1">.*?</g>',s))
    # tight bounds: isotype bbox + text bbox approx from png (all non-bg)
    a=np.array(Image.open(f'{src}.png').convert('RGB')).astype(int); m=np.abs(a-[241,240,236]).sum(2)>40
    ys,xs=np.where(m); bx0,by0,bx1,by1=[v*k for v in (xs.min(),ys.min(),xs.max(),ys.max())]
    pad=4; vb=f'{bx0-pad:.2f} {by0-pad:.2f} {bx1-bx0+2*pad:.2f} {by1-by0+2*pad:.2f}'
    for variant,txt,brown in [('color','#000000',None),('negativo','#FFFFFF','#F0EFEB')]:
        iso=inner if not brown else inner.replace('fill="#47382F"',f'fill="{brown}"')
        txtg=text.replace('fill="rgb(0%, 0%, 0%)"',f'fill="{txt}"')
        svg=f'''<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="{vb}">
<title>CROCHETES by MARIA — logo {key} ({variant})</title>
<defs>{glyph_defs}</defs>
<g transform="translate({px:.3f},{py:.3f}) scale({sc:.6f})">{iso}</g>
{txtg}
</svg>
'''
        open(f'{OUT}/crochetes-logo-{key}-{variant}.svg','w').write(svg)
    if key=='vertical':
        for variant,brown in [('color',None),('negativo','#F0EFEB')]:
            iso=inner if not brown else inner.replace('fill="#47382F"',f'fill="{brown}"')
            open(f'{OUT}/crochetes-isotipo-{variant}.svg','w').write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {vw} {vh}">\n<title>CROCHETES isotipo ({variant})</title>\n{iso}\n</svg>\n')
