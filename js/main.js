    // LOADING SCREEN
    let lp=0;const lb=document.getElementById('loaderBar'),lpc=document.getElementById('loaderPercent'),ld=document.getElementById('loader');
    const li=setInterval(()=>{lp+=Math.random()*15+5;if(lp>=100){lp=100;clearInterval(li);setTimeout(()=>{ld.style.opacity='0';ld.style.visibility='hidden';document.body.style.overflow='auto';initReveal()},400)}lb.style.width=lp+'%';lpc.textContent=Math.floor(lp)+'%'},200);
    document.body.style.overflow='hidden';

    // CURSOR GLOW
    const cg=document.getElementById('cursorGlow');let cx=0,cy=0,gx=0,gy=0;
    document.addEventListener('mousemove',e=>{cx=e.clientX;cy=e.clientY});
    function ac(){gx+=(cx-gx)*.1;gy+=(cy-gy)*.1;cg.style.left=gx+'px';cg.style.top=gy+'px';requestAnimationFrame(ac)}ac();
    if('ontouchstart' in window)cg.style.display='none';

    // PARTICLES
    const cv=document.getElementById('particles-canvas'),ct=cv.getContext('2d');let ps=[];
    function rc(){cv.width=innerWidth;cv.height=innerHeight}rc();addEventListener('resize',rc);
    class P{constructor(){this.r()}r(){this.x=Math.random()*cv.width;this.y=Math.random()*cv.height;this.s=Math.random()*2+.5;this.sx=(Math.random()-.5)*.5;this.sy=(Math.random()-.5)*.5;this.o=Math.random()*.4+.1}u(){this.x+=this.sx;this.y+=this.sy;if(this.x<0||this.x>cv.width)this.sx*=-1;if(this.y<0||this.y>cv.height)this.sy*=-1}d(){ct.beginPath();ct.arc(this.x,this.y,this.s,0,Math.PI*2);ct.fillStyle=`rgba(37,99,235,${this.o})`;ct.fill()}}
    for(let i=0;i<60;i++)ps.push(new P());
    function dl(){for(let i=0;i<ps.length;i++){for(let j=i+1;j<ps.length;j++){const dx=ps[i].x-ps[j].x,dy=ps[i].y-ps[j].y,d=Math.sqrt(dx*dx+dy*dy);if(d<150){ct.beginPath();ct.strokeStyle=`rgba(37,99,235,${.06*(1-d/150)})`;ct.lineWidth=.5;ct.moveTo(ps[i].x,ps[i].y);ct.lineTo(ps[j].x,ps[j].y);ct.stroke()}}}}
    function ap(){ct.clearRect(0,0,cv.width,cv.height);ps.forEach(p=>{p.u();p.d()});dl();requestAnimationFrame(ap)}ap();

    // TYPING
    const tt=document.getElementById('typedTarget');
    const ph=['Cybersecurity Learner, Pentest & 3D Web 🛡️','Building Secure Web Experiences 🔒','Frontend Developer • React • Three.js ⚛️','Exploring Pentesting & App Security 🎯'];
    let pi=0,ci=0,id=false;
    function te(){const c=ph[pi];if(!id){tt.innerHTML=c.substring(0,ci)+'<span class="typed-cursor">|</span>';ci++;if(ci>c.length){id=true;setTimeout(te,2000);return}}else{tt.innerHTML=c.substring(0,ci)+'<span class="typed-cursor">|</span>';ci--;if(ci<0){id=false;pi=(pi+1)%ph.length;setTimeout(te,500);return}}setTimeout(te,id?30:80)}setTimeout(te,1500);

    // NAVBAR SCROLL
    const nb=document.getElementById('navbar'),st=document.getElementById('scrollTopBtn');
    addEventListener('scroll',()=>{
      if(scrollY>50){nb.style.background='rgba(10,22,40,0.92)';nb.style.backdropFilter='blur(20px)';nb.style.webkitBackdropFilter='blur(20px)';nb.style.borderBottom='1px solid rgba(37,99,235,0.15)';nb.style.padding='10px 24px'}
      else{nb.style.background='transparent';nb.style.backdropFilter='none';nb.style.webkitBackdropFilter='none';nb.style.borderBottom='none';nb.style.padding='16px 24px'}
      if(scrollY>400){st.style.opacity='1';st.style.visibility='visible';st.style.transform='translateY(0)'}
      else{st.style.opacity='0';st.style.visibility='hidden';st.style.transform='translateY(10px)'}
    });
    st.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));

    // HAMBURGER
    const hb=document.getElementById('hamburger'),mm=document.getElementById('mobileMenu');
    function setMenuOpen(open){
      hb.classList.toggle('active',open);
      mm.classList.toggle('open',open);
      nb.classList.toggle('menu-open',open);
      hb.setAttribute('aria-expanded',open);
      document.body.style.overflow=open?'hidden':'auto';
    }
    hb.addEventListener('click',()=>setMenuOpen(!mm.classList.contains('open')));
    function closeMenu(){setMenuOpen(false)}

    // REVEAL
    function initReveal(){const rv=document.querySelectorAll('.reveal');const ob=new IntersectionObserver(e=>{e.forEach(en=>{if(en.isIntersecting)en.target.classList.add('active')})},{threshold:.1});rv.forEach(el=>ob.observe(el))}

    // SKILL BAR
    const so=new IntersectionObserver(e=>{e.forEach(en=>{if(en.isIntersecting)en.target.querySelectorAll('.skill-fill').forEach(f=>{f.style.width=f.dataset.width+'%'})})},{threshold:.3});
    document.querySelectorAll('.skill-fill').forEach(el=>{const c=el.closest('.bg-gradient-to-br');if(c)so.observe(c)});

    // CERTIFICATE SLIDERS
    document.querySelectorAll('.cert-slider').forEach(slider=>{
      const track=slider.querySelector('.cert-slides'),total=track.children.length;
      if(total<2)return;
      let idx=0;
      const prev=slider.querySelector('.cert-prev'),next=slider.querySelector('.cert-next'),dots=slider.querySelectorAll('.cert-dot');
      const go=n=>{idx=(n+total)%total;track.style.transform=`translateX(-${idx*100}%)`;dots.forEach((d,i)=>d.classList.toggle('active',i===idx))};
      prev.addEventListener('click',e=>{e.stopPropagation();go(idx-1)});
      next.addEventListener('click',e=>{e.stopPropagation();go(idx+1)});
      dots.forEach((d,i)=>d.addEventListener('click',e=>{e.stopPropagation();go(i)}));
    });

    // CERTIFICATE LIGHTBOX
    const clb=document.getElementById('certLightbox'),clbImg=document.getElementById('certLightboxImg'),clbClose=document.getElementById('certLightboxClose');
    let prevOverflow='';
    function openCertLightbox(src,alt){
      clbImg.src=src;
      clbImg.alt=alt||'Certificate';
      prevOverflow=document.body.style.overflow;
      clb.classList.add('open');
      clb.setAttribute('aria-hidden','false');
      document.body.style.overflow='hidden';
    }
    function closeCertLightbox(){
      clb.classList.remove('open');
      clb.setAttribute('aria-hidden','true');
      document.body.style.overflow=prevOverflow||'auto';
      clbImg.src='';
    }
    document.querySelectorAll('.cert-slide').forEach(img=>{
      img.addEventListener('click',e=>{e.stopPropagation();openCertLightbox(img.src,img.alt)});
    });
    document.querySelectorAll('.project-thumb').forEach(thumb=>{
      thumb.addEventListener('click',()=>{
        const img=thumb.querySelector('.project-slide');
        if(img)openCertLightbox(img.src,img.alt);
      });
    });
    clbClose.addEventListener('click',closeCertLightbox);
    clb.addEventListener('click',e=>{if(e.target===clb)closeCertLightbox()});
    document.addEventListener('keydown',e=>{
      if(!clb.classList.contains('open'))return;
      if(e.code==='Space'||e.code==='Escape'){e.preventDefault();closeCertLightbox()}
    });

    // CONTACT FORM
    document.getElementById('contactForm').addEventListener('submit',e=>{e.preventDefault();const t=document.getElementById('toast');document.getElementById('toastMsg').textContent='Message sent successfully! 🚀';t.style.transform='translateY(0)';t.style.opacity='1';setTimeout(()=>{t.style.transform='translateY(100px)';t.style.opacity='0'},4000);e.target.reset()});

    // SMOOTH SCROLL
    document.querySelectorAll('a[href^="#"]').forEach(a=>{a.addEventListener('click',function(e){e.preventDefault();const t=document.querySelector(this.getAttribute('href'));if(t)t.scrollIntoView({behavior:'smooth',block:'start'})})});