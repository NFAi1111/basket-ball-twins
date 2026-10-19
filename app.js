const $=i=>document.getElementById(i),HX=1.575,ARC={NBA:[7.24,6.7],FIBA:[6.75,6.6]},POS=['PG','SG','SF','PF','C'];
const ROLE=['ควบคุมจังหวะ อ่านดีเฟนส์ เล่นปิ๊กแอนด์โรลและจ่ายบอล','ชู้ตเตอร์ ใช้สกรีนไม่มีบอลเพื่อรับแล้วยิงเร็ว','วิงสองทาง ไดรฟ์ คัต และยิงสามแต้มมุม','พาวเวอร์ ตั้งสกรีน ป๊อปยิงกลาง และรีบาวน์','เซ็นเตอร์ ตั้งสกรีน โรลลงแป้น จบใต้ห่วง'];
const TN={pnr:'พิกแอนด์โรล',scr:'สกรีนไม่มีบอล',cut:'คัต/แบ็กดอร์',iso:'ไอโซ/ไดรฟ์',pst:'เล่นโพสต์',spt:'ยิงสปอตอัพ',dho:'แฮนด์ออฟ',mot:'โมชั่น/สวิงบอล'};
const cl=(v,a,b)=>Math.max(a,Math.min(b,v)),sm=t=>t*t*(3-2*t),LB={B:'NBA+FIBA',N:'NBA',F:'FIBA'};
const SP={T:[9.5,0,'ท็อป'],WL:[8,-5.6,'ปีกซ้าย'],WR:[8,5.6,'ปีกขวา'],SL:[8.8,-2.7,'สล็อตซ้าย'],SR:[8.8,2.7,'สล็อตขวา'],CL:[1.5,-6.9,'มุมซ้าย'],CR:[1.5,6.9,'มุมขวา'],EL:[5.8,-2.5,'เอลโบว์ซ้าย'],ER:[5.8,2.5,'เอลโบว์ขวา'],HP:[5.8,0,'โพสต์สูง'],BL:[2.8,-2.5,'บล็อกซ้าย'],BR:[2.8,2.5,'บล็อกขวา'],R:[3,0,'ใต้แป้น'],ML:[5,-5.4,'กลางซ้าย'],MR:[5,5.4,'กลางขวา'],DL:[1.9,-1.6,'เลย์อัพซ้าย'],DR:[1.9,1.6,'เลย์อัพขวา'],AL:[7.6,-4.4,'ปีกสูงซ้าย'],AR:[7.6,4.4,'ปีกสูงขวา'],UL:[7.4,-2.2,'ฟรีโธรซ้าย'],UR:[7.4,2.2,'ฟรีโธรขวา'],LL:[4.4,-4.6,'ต่ำซ้าย'],LR:[4.4,4.6,'ต่ำขวา'],KL:[6.2,-4.4,'ข้างซ้าย'],KR:[6.2,4.4,'ข้างขวา'],BM:[1.9,0,'เบสไลน์'],Z1:[-20,-3,'-'],Z2:[-20,3,'-']};
function AR(){return ARC[S.n===3?'FIBA':S.lg]}
const CSV_TAGS={PR:'pnr,cut',H:'scr,cut',PD:'scr,spt',DK:'iso,spt',ISO:'iso'};
const CSV=`id,league,name,kind,step,ball,x1,z1,x2,z2,x3,z3,x4,z4,x5,z5,note
PR,BOTH,Pick & Roll 1-5,ไม่มีบอล (C โรลจบเกม),0,1,9,0,7,-6,7,6,5,-4.5,6.5,2,PG ถือบอลที่ท็อป C เข้าตั้งสกรีน
PR,BOTH,Pick & Roll 1-5,ไม่มีบอล (C โรลจบเกม),1,1,8.2,1.2,7,-6,7,6,5,-4.5,7.6,1,C ตั้งสกรีนข้างบอล PG เลี้ยวขวาชิดสกรีน
PR,BOTH,Pick & Roll 1-5,ไม่มีบอล (C โรลจบเกม),2,1,6,3.2,6.6,-6,7.2,6.2,4.8,-5,5.2,0.6,PG ผ่านสกรีน C โรลลงแป้น ดึงดีเฟนส์สองคน
PR,BOTH,Pick & Roll 1-5,ไม่มีบอล (C โรลจบเกม),3,5,6,3.2,6.6,-6,7.2,6.2,4.8,-5,3.2,0.4,PG ส่งบอลให้ C ใต้แป้น จบเลย์อัพ
H,BOTH,Horns Curl,ไม่มีบอล (PG เคิร์ลจบเกม),0,1,9,0,3.5,-6.9,3.5,6.9,7.5,-2.6,7.5,2.6,ตั้งฮอร์น PG ถือบอลที่ท็อป PF กับ C ยืนสองข้างฟรีโธร
H,BOTH,Horns Curl,ไม่มีบอล (PG เคิร์ลจบเกม),1,4,8,1,3.5,-6.9,3.5,6.9,7.5,-2.6,7.5,2.6,PG ส่งให้ PF แล้วคัตเข้าหาสกรีนของ C
H,BOTH,Horns Curl,ไม่มีบอล (PG เคิร์ลจบเกม),2,4,5.4,3.6,3.5,-6.9,3.5,6.9,7.5,-2.6,7.6,2.6,PG เคิร์ลรอบสกรีนพุ่งเข้าหาแป้น
H,BOTH,Horns Curl,ไม่มีบอล (PG เคิร์ลจบเกม),3,1,3.4,1.4,3.5,-6.9,3.5,6.9,7.5,-2.6,7.6,2.6,PF ส่งคืน PG ใต้แป้น จบเลย์อัพ
PD,NBA,Pin-down Flare,ไม่มีบอล (SG ยิงสามแต้ม),0,1,9.5,0,2.5,-5.5,3.5,6.9,6.5,4.5,4.8,-4.2,SG ซุ่มใต้แป้น C เตรียมตั้ง pin-down
PD,NBA,Pin-down Flare,ไม่มีบอล (SG ยิงสามแต้ม),1,1,9.5,0.3,3.8,-5,3.5,6.9,6.5,4.5,4.8,-4.2,SG ชิดสกรีนของ C ผู้ป้องกันถูกขวาง
PD,NBA,Pin-down Flare,ไม่มีบอล (SG ยิงสามแต้ม),2,1,9.5,0.3,7.4,-6.4,3.5,6.9,6.5,4.5,4.8,-4.2,SG เฟลร์ออกปีกปลดตัวเปิด
PD,NBA,Pin-down Flare,ไม่มีบอล (SG ยิงสามแต้ม),3,2,9.5,0.3,7.6,-6.3,3.5,6.9,6.5,4.5,4.8,-4.2,PG ส่งให้ SG ยิงสามแต้มทันทีหลังรับ
DK,FIBA,Drive & Kick,มีบอล→ไม่มีบอล (ไดรฟ์แล้วจ่ายมุม),0,1,8.5,-4,8,5.5,1.5,6.9,4.5,-5.5,5,1.5,PG ถือบอลปีก SF รออยู่มุม
DK,FIBA,Drive & Kick,มีบอล→ไม่มีบอล (ไดรฟ์แล้วจ่ายมุม),1,1,6,-2.5,8,5.5,1.5,6.9,4.5,-5.5,5,1.5,ไดรฟ์เข้าเลน ดึงดีเฟนส์มาช่วย
DK,FIBA,Drive & Kick,มีบอล→ไม่มีบอล (ไดรฟ์แล้วจ่ายมุม),2,1,4.2,-0.8,8,5.5,1.5,6.9,4.5,-5.5,4.8,1.2,พุ่งถึงโซนฟรีโธรดึงสองคนเข้าหา
DK,FIBA,Drive & Kick,มีบอล→ไม่มีบอล (ไดรฟ์แล้วจ่ายมุม),3,3,4.2,-0.8,8,5.5,1.5,6.9,4.5,-5.5,4.8,1.2,คิกบอลออกมุมให้ SF ยิงสามแต้ม
ISO,NBA,High Iso,มีบอล (PG จบเอง),0,1,9,-4,3,-6.9,3,6.9,6.5,6,4.5,5.5,เคลียร์เอาต์ให้ PG เล่นหนึ่งต่อหนึ่ง
ISO,NBA,High Iso,มีบอล (PG จบเอง),1,1,7.6,-2.4,3,-6.9,3,6.9,6.5,6,4.5,5.5,PG ไดรฟ์ซ้ายหาจังหวะ
ISO,NBA,High Iso,มีบอล (PG จบเอง),2,1,6.8,-0.6,3,-6.9,3,6.9,6.5,6,4.5,5.5,เบรกจังหวะแล้วดึงยิงระยะกลาง`;
const PL=`Spain PnR|B|ไม่มีบอล (C โรลหลังสกรีนซ้อน)|pnr,scr,cut|T,WL,CR,ER,HP|1/1 5=UL/1 1=EL 5=R 4=HP/5
Pick & Pop|B|ไม่มีบอล (Big ป๊อป 3 แต้ม)|pnr,spt|T,CL,CR,WR,HP|1/1 5=UL/1 1=SL/5 5=AL
DHO Chicago|B|มีบอล (แฮนด์ออฟแล้วไดรฟ์)|dho,iso|WL,T,CR,CL,ER|2/1 1=SL/1 1=EL 2=WL/1 1=DL
Horns Flare|B|ไม่มีบอล (SG ฟลาร์ 3 แต้ม)|scr,spt|T,CL,CR,EL,ER|1/1 2=BL/1 2=ML/2 2=WL
Floppy|N|ไม่มีบอล (ชู้ตเตอร์ผ่านสกรีนคู่)|scr,cut|T,CL,CR,BL,BR|1/1 2=BL 3=BR/1 2=EL 3=ER/2
UCLA Cut|B|ไม่มีบอล (PG คัตหลังจ่าย)|cut,pst|T,WL,WR,CR,HP|1/5/5 1=DL/1
Elbow Post Iso|N|มีบอล (Big เล่นโพสต์)|pst,iso|T,CL,CR,WR,EL|1/5/5 5=DL
Wing Iso 1-4|N|มีบอล (ไอโซปีก)|iso,spt|WL,CL,CR,T,ER|1/1 1=ML/1 1=BL
Weak-side Pin-down|B|ไม่มีบอล (SG ผ่านพินดาวน์)|scr,spt|T,WL,CR,HP,BR|1/1 5=ER/1 3=AR/3
Stagger Screen|N|ไม่มีบอล (วิ่งผ่านสกรีนซ้อน)|scr,spt|T,CL,CR,BL,BR|1/1 2=ML/1 2=AL/2 2=WL
Iverson Cut|F|ไม่มีบอล (คัตข้ามเลน)|cut,scr|T,WL,WR,EL,ER|1/1 2=ML/1 2=EL 4=HP/2 2=R
Zipper Cut|B|ไม่มีบอล (ซิปเปอร์ขึ้นเอลโบว์)|cut,spt|T,WR,BL,CR,HP|1/1 5=ER/1 3=EL/3
Dribble Drive Motion|B|มีบอล (ไดรฟ์แล้วเลื่อนที่)|iso,mot,spt|WL,SR,WR,CL,HP|1/1 1=ML/1 1=DL/3
Pistol Action|N|มีบอล (PnR เร็ว)|pnr,dho|T,WL,CR,WR,SL|1/1 5=UL/1 1=EL 5=HP/1 1=DR
5-Out Swing|F|ไม่มีบอล (สวิงบอลหาสามแต้ม)|mot,spt|T,WL,WR,CL,CR|1/2/4/4
Chin Action|F|ไม่มีบอล (Big แฮนด์ออฟเอลโบว์)|dho,pst|T,WL,CR,WR,EL|1/5/5 5=DL
Zoom DHO|N|มีบอล (DHO ความเร็ว)|dho,spt|WL,T,CR,CL,SL|2/1 1=SL/1 1=UL
Triple Pinch|B|ไม่มีบอล (คัตใต้แป้นรอบโพสต์)|pst,cut|T,CL,CR,ER,HP|1/5/5 2=BL/2 2=DL
Box Lob|F|ไม่มีบอล (อัลเลย์อูป)|cut,pst|T,BL,BR,EL,ER|1/1 5=HP/1 5=R/5
BLOB Stagger|N|ไม่มีบอล (จบสามแต้มจากชู้ต)|scr,spt|T,CL,CR,BL,BR|1/1 3=BR/1 3=ER/1 3=AR/3
Princeton Backdoor|B|ไม่มีบอล (คัตหลังประตู)|cut,mot|T,WL,WR,CL,HP|1/5/5 3=DR/3
Weave 3-Man|B|มีบอล (ถักทอแฮนด์ออฟ)|dho,mot|WL,T,WR,CL,CR|2/2 3=SR 2=T/3 3=UR/3 3=DR
Horns Twist|B|ไม่มีบอล (ผ่านสกรีนแล้วฟลาร์)|scr,cut|T,CL,CR,EL,ER|1/1 3=BR 2=BL/1 3=AR/3
Elevator Screen|N|ไม่มีบอล (ประตูสกรีน)|scr,spt|T,CL,WR,BL,BR|1/1 2=ML/1 2=AL/2
Early Drag|B|มีบอล (ดราก PnR ต้นเกม)|pnr,iso|T,WL,WR,CL,SR|1/1 4=SL/1 1=EL 4=HP/1 1=DL`;
const DF=`ประกบแน่น|B|*.6|cut,scr,mot|กดดันหนัก เสี่ยงโดนคัตและสกรีน
Man มาตรฐาน|B|*1.1|pnr,dho|สมดุล แต่โดนสกรีนต่อเนื่องได้
Man ถอยหลวม (Sag)|B|*2|spt,dho|กันไดรฟ์ ยอมให้ยิงไกล
Deny ปีก|B|M.8,M.5,M.5,M1.4,M1.4|cut,pst|ปิดเส้นจ่าย แต่โดนแบ็กดอร์
Switch ทุกสกรีน|B|*1|pst,iso|โดนเล่นมิสแมตช์
Drop Coverage|B|M1,M1,M1,M1,R|spt,dho|C ถอยลึก ยิงกลาง/สามเปิด
Hedge & Recover|N|M1,M1,M1,M1,HP|cut,pst|C ออกสูง ช่องโรลเปิด
Ice (ผลักเข้าข้าง)|B|M.8,M.8,M1.2,M1.2,BL|spt,iso|ผลักบอลเข้าเส้นข้าง
Pack Line|B|*1.8|spt,iso|กันไดรฟ์ ยิงนอกเปิด
Gap Help|B|M.9,M1.6,M1.6,M1.6,M1.6|dho,spt|ช่วยเร็วแต่เปิดมุม
ประกบดาวเด่น|F|M.3,M1.2,M1.2,M1.2,M1.2|pnr,dho|คนอื่นเสียสมดุล
Front Post|B|M1,M1,M1,M1,M.2|spt,mot|ปิดโพสต์ โดนโลบ/ยิงนอก
โซน 2-3|B|UL,UR,LL,R,LR|spt,dho|มุมและเอลโบว์เปิด
โซน 3-2|B|AL,T,AR,BL,BR|pst,cut|ใต้แป้นบาง
โซน 1-3-1|B|T,KL,HP,KR,BM|spt,cut|มุมเบสไลน์เปิด
โซน 2-1-2|B|UL,UR,HP,BL,BR|spt|ปีกสามแต้มเปิด
โซน 1-2-2|B|T,KL,KR,BL,BR|spt,pst|เอลโบว์และมุมเปิด
Extended 2-3|F|AL,AR,LL,R,LR|pnr,cut|กดสูง ช่องกลางว่าง
Match-up Zone|B|M1,M1,LL,R,LR|spt,pnr|สับสนเมื่อมีสกรีน
Zone Trap มุม|N|UL,UR,ML,MR,R|pnr,cut|ทรัปแล้วเปิดสกิป
Box-and-1|B|M.4,BL,BR,EL,ER|spt,pnr|เปิดสามแต้มปีก
Triangle-and-2|F|M.4,M.4,R,EL,ER|spt,pst|โดนสวิงบอล
Diamond-and-1|B|M.4,UL,UR,R,HP|spt,cut|มุมและเบสไลน์ว่าง
Wall เอลโบว์|N|M1.2,M1.2,EL,ER,R|spt,mot|ปิดกลาง ปีกว่าง
Nail Help|B|M1.2,M1.2,M1.2,M1.2,BM|spt,mot|ช่วยกลางเลน ปีกเปิด
Tag/Rotate Help|B|*1.3|spt,dho|หมุนช่วยช้า โดนสวิงบอล
Overload ฝั่งบอล|F|KL,UL,LL,R,BL|mot,spt|ฝั่งตรงข้ามว่าง
Blitz/Trap PnR|B|M.6,M1.2,M1.2,M1.2,UL|cut,spt|โรล 4-on-3
Peel Switch|N|M.7,M.9,M1.3,M1.3,M1.3|iso,pst|ช่วยไดรฟ์แต่เสียระยะ
Zone Press Retreat|F|T,AL,AR,R,HP|pnr,spt|ถอยโซนช้า`;
const DF3=`Man ประกบแน่น 3x3|B|M.6,M.6,M.6,X,X|cut,scr,mot|กดดันหนัก เสี่ยงโดนคัต
Man มาตรฐาน 3x3|B|M1.1,M1.1,M1.1,X,X|pnr,dho|สมดุล โดนสกรีนได้
Man ถอยหลวม 3x3|B|M2,M2,M2,X,X|spt,dho|กันไดรฟ์ ยอมให้ยิง
Switch ทุกสกรีน 3x3|B|M1,M1,M1,X,X|pst,iso|โดนเล่นมิสแมตช์
Drop & Help 3x3|B|M1,M1,R,X,X|spt,dho|ใต้แป้นแน่น ยิงนอกเปิด
โซน 2-1|B|UL,UR,R,X,X|spt,cut|มุมเปิด
โซน 1-2|B|T,LL,LR,X,X|spt,pst|เอลโบว์เปิด`;
const VS={on:false,focus:null,sc:[0,0]},ATK={t3:[78,88,80,70,52],fin:[62,66,76,82,92],mid:[75,78,76,80,66]},DEFR={per:[80,76,80,72,60],rim:[52,56,66,80,92]};
function radj(sh,th,dist,d){if(!VS.on)return 0;const sk=th?ATK.t3[sh]:dist<2.5?ATK.fin[sh]:ATK.mid[sh],f=VS.focus,r=f==null?70:((th||dist>=2.5)?DEFR.per[f]:DEFR.rim[f]);return(sk-72)*.004-(r-70)*.003*(d&&/^M[\d.]/.test(d.a[0])?1:.6)}
let DB=[],S={T:0,play:true,sp:1,lg:'NBA',tab:'ball',sel:1,df:'0',shoot:true,idle:false,optDone:true,chk2:-1,match:[0,1,2,3,4],vsId:null,vsPos:null,n:5,full:0,iq:2,chk:-1,stl:null,blk:0,clk:0,rnd:[.5,.5,.5,.5,.5],D:null,made:null,ci:-1,fx:0,sh:0,tr:1};
const MID=[.5,.5,.5,.5,.5],mkD=t=>t.split('\n').map(l=>{const[n,lg,a,b,note]=l.split('|');return{name:n,lg,a:a[0]==='*'?Array(5).fill('M'+a.slice(1)):a.split(','),beats:b.split(','),note}}),DEFS5=mkD(DF),DEFS3=mkD(DF3);let DEFS=DEFS5;
function parse(t){const m={};t.trim().split(/\r?\n/).forEach(l=>{const r=l.split(',');if(r.length<17||isNaN(+r[4]))return;const o=m[r[0]]||(m[r[0]]={id:r[0],lg:r[1][0]==='B'?'B':r[1][0]==='N'?'N':'F',name:r[2],kind:r[3],tags:(CSV_TAGS[r[0]]||'mot').split(','),steps:[]});const n=r.slice(6,16).map(Number);o.steps[+r[4]]={ball:+r[5],pos:[0,1,2,3,4].map(i=>[n[2*i],n[2*i+1]]),note:r.slice(16).join(' ')}});return Object.values(m).filter(p=>p.steps.length>1&&p.steps.every(Boolean))}
function gen(s,i){const[n,lg,kind,tg,f,st]=s.split('|');let ps=f.split(',').map(k=>SP[k]);return{id:'G'+i,lg,name:n,kind,tags:tg.split(','),steps:st.split('/').map(q=>{const t=q.split(' '),mv=t.slice(1);ps=ps.slice();mv.forEach(m=>{const[a,b]=m.split('=');ps[a-1]=SP[b]});return{ball:+t[0],pos:ps.slice(),note:POS[t[0]-1]+' ถือบอล'+mv.map(m=>{const[a,b]=m.split('=');return' · '+POS[a-1]+'→'+SP[b][2]}).join('')}})}}
const OB=`V-Cut หลุดปีก|B|ไม่มีบอล (V-cut รับสามแต้ม)|cut,spt|T,ML,WR,CL,HP|1/1 2=LL/1 2=WL/2
Backdoor Cut|B|ไม่มีบอล (คัตหลังผู้ป้องกัน)|cut|T,WL,WR,CL,HP|1/1 2=ML/1 2=DL/2
Flash Cut โพสต์สูง|B|ไม่มีบอล (แฟลชรับกลางเลน)|cut,pst|T,WL,WR,CL,BL|1/1 5=EL/5 5=HP/5 5=R
Slip Screen ลื่นเข้าแป้น|B|ไม่มีบอล (สกรีนแล้วสลิป)|scr,cut|T,WL,WR,EL,ER|1/1 4=SL/1 4=UL/4 4=BM
Down Screen ขึ้นปีก|B|ไม่มีบอล (ดาวน์สกรีนรับสามแต้ม)|scr,spt|T,CL,CR,BL,BR|1/1 2=ML/1 2=AL/2
Back Screen คัตเข้าแป้น|B|ไม่มีบอล (แบ็กสกรีนเลย์อัพ)|scr,cut|T,WL,WR,HP,CR|1/1 5=MR/1 3=ER 5=BR/3 3=DR
Cross Screen ข้ามเลน|N|ไม่มีบอล (ครอสสกรีนเลย์อัพ)|scr,cut|T,CL,WR,BR,BL|1/1 4=BM/1 2=BL 4=R/2 2=DL
Flare Screen ฟลาร์มุม|B|ไม่มีบอล (ฟลาร์หนีสกรีน)|scr,spt|T,WL,CR,HP,BR|1/1 4=ER/1 3=AR/3
Pin-down เคิร์ลแป้น|B|ไม่มีบอล (เคิร์ลเลย์อัพ)|scr,cut|T,CL,WR,CR,HP|1/1 5=BL/1 2=EL/2 2=R
Curl รอบสกรีน|F|ไม่มีบอล (เคิร์ลรอบสกรีน)|scr,cut|T,WL,WR,CL,HP|1/1 2=EL/1 2=DL/2
Fade Screen ออกมุม|N|ไม่มีบอล (เฟดออกมุม)|scr,spt|T,WL,BR,CL,HP|1/1 5=DR/1 3=CR/3
Zipper ขึ้นเอลโบว์|B|ไม่มีบอล (ซิปเปอร์แล้วไดรฟ์)|cut,iso|T,WR,BL,CR,HP|1/1 5=ER/1 3=EL/3 3=DL
Elevator Doors|F|ไม่มีบอล (ประตูลิฟต์ปล่อยชู้ตเตอร์)|scr,spt|T,CL,CR,BL,BR|1/1 2=ML 3=MR/1 2=AL 3=AR/2
Stagger Screen คู่|N|ไม่มีบอล (วิ่งผ่านสกรีนสองตัว)|scr,spt|T,CL,CR,BL,HP|1/1 2=ML 5=EL/1 2=AL/2 2=WL
Wedge Screen ลงเลน|F|ไม่มีบอล (เวดจ์สกรีนเข้าแป้น)|scr,cut|T,WL,WR,EL,ER|1/1 4=HP/1 3=MR 4=ER/3 3=DR
Split Cut หลังโพสต์|B|ไม่มีบอล (สปลิตคัตรับจากโพสต์)|cut,pst|T,WL,WR,CL,HP|1/5/5 2=EL/2 2=DL
UCLA Cut แปรผัน|B|ไม่มีบอล (UCLA แล้วเล่นต่อ)|cut,pst|T,WL,WR,CR,HP|1/5/5 1=BL/1 1=DL
Iverson Cut ข้ามเลน|F|ไม่มีบอล (Iverson cut)|cut,scr|T,CL,WR,EL,ER|1/1 2=BL/1 2=EL 5=HP/2 2=R
Rip Screen ปีก|N|ไม่มีบอล (ริปสกรีนยิงสามแต้ม)|scr,spt|T,WL,WR,CL,BR|1/1 5=ER/1 3=AR 5=MR/3
Rub Cut รอบโพสต์|B|ไม่มีบอล (รับจากโพสต์เลย์อัพ)|cut,pst|T,WL,CR,BL,HP|1/5/5 2=ML/5 2=EL/2 2=DL
Dunker Spot|B|ไม่มีบอล (ซุ่มเบสไลน์รอจบ)|cut,pst|T,WL,WR,CL,HP|1/1 5=BL/1 1=UL 5=BM/5
Corner Lift|F|ไม่มีบอล (ยกจากมุมขึ้นปีก)|spt,mot|T,SL,CR,CL,HP|1/1 4=ML/1 4=WL/4
Baseline Drift|B|ไม่มีบอล (ลอยตามเบสไลน์เข้ามุม)|spt,mot|T,WL,BR,CL,HP|1/1 3=DR/1 3=CR/3
Weak-side Lift|N|ไม่มีบอล (ยกฝั่งอ่อนรับสวิง)|spt,mot|T,WL,CR,CL,HP|1/1 3=BR/1 3=AR/3
Skip Relocation|B|ไม่มีบอล (ย้ายหลังสกิปพาส)|spt,mot|T,WL,WR,CL,HP|1/2/2 3=AR/3
Shot-Fake Relocate|F|ไม่มีบอล (ฟลายแล้วย้ายหาช่อง)|iso,mot|T,WL,WR,CL,CR|1/2/2 2=EL/2 2=DL
Fill-the-Gap|B|ไม่มีบอล (เติมช่องเมื่อเพื่อนไดรฟ์)|mot,spt|T,WL,WR,CL,HP|1/1 1=ML/1 1=DL 3=AR/3
Drive-Kick Read|B|ไม่มีบอล (อ่านช่องรับคิกบอล)|iso,spt|T,SL,SR,CL,CR|1/1 1=UL/1 1=DL/4
Pop & Replace|N|ไม่มีบอล (ป๊อปแล้วแทนที่)|pnr,spt|T,WL,WR,CL,HP|1/1 5=UL/1 1=SR 5=AL/5
Spain Back-Screen ชู้ตเตอร์|B|ไม่มีบอล (แบ็กสกรีนหลังพิกแอนด์โรล)|pnr,scr,spt|T,WL,CR,BR,HP|1/1 5=UL/1 1=EL 4=ER 5=R/1 3=AR/3`;
const mc=c=>c.length===2&&'LR'.includes(c[1])?c[0]+(c[1]==='L'?'R':'L'):c;
const OBL=OB.split('\n').flatMap((s,i)=>[0,1].map(m=>{if(m){const q=s.split('|');q[4]=q[4].split(',').map(mc).join(',');q[5]=q[5].replace(/=([A-Z]+)/g,(_,c)=>'='+mc(c));s=q.join('|')}const o=gen(s,i*2+m);o.id='OB'+(i*2+m);o.name+=m?' (ขวา)':' (ซ้าย)';return o}));
const P3=`Pick & Roll 3x3|F|ไม่มีบอล (โรลจบใต้แป้น)|pnr,scr|T,WL,HP,Z1,Z2|1/1 3=UL/1 1=EL 3=R/3
Pick & Pop 3x3|F|ไม่มีบอล (ป๊อปยิงสองแต้ม)|pnr,spt|T,WL,HP,Z1,Z2|1/1 3=UL/1 1=SL 3=AL/3
Give & Go|F|ไม่มีบอล (จ่ายแล้วคัต)|cut,mot|T,WL,WR,Z1,Z2|1/2/2 1=DL/1
Wing Iso 3x3|F|มีบอล (ไอโซปีก)|iso|T,WL,CR,Z1,Z2|1/1 1=ML/1 1=DL
Back Screen 3x3|F|ไม่มีบอล (แบ็กสกรีนเลย์อัพ)|scr,cut|T,WL,HP,Z1,Z2|1/1 3=ML/1 2=EL/2 2=DL
Pin-down 3x3|F|ไม่มีบอล (พินดาวน์ยิงสองแต้ม)|scr,spt|T,CL,HP,Z1,Z2|1/1 3=BL/1 2=EL/2 2=WL
Hand-off 3x3|F|มีบอล (แฮนด์ออฟแล้วไดรฟ์)|dho,iso|WL,T,CR,Z1,Z2|2/1 1=SL/1 1=EL/1 1=DL
Drive & Kick 3x3|F|ไม่มีบอล (ไดรฟ์แล้วคิกมุม)|iso,spt|T,SL,CR,Z1,Z2|1/1 1=UL/1 1=DL/3
Skip Relocate 3x3|F|ไม่มีบอล (สกิปแล้วย้ายตำแหน่ง)|spt,mot|T,WL,WR,Z1,Z2|1/2/2 3=AR/3`;
const P3L=P3.split('\n').map((s,i)=>{const o=gen(s,100+i);o.id='T'+i;o.n=3;return o});
const MO=`Horns Set (3 ทางเลือก)|B|หลายตัวเลือก (Horns)|pnr,scr,spt|T,CL,CR,EL,ER|1/1 4=UL 5=UR|พิกแอนด์โรลฝั่งซ้าย::1 5=SL/1 1=EL 5=R/5||พินดาวน์ SG ยิงสาม::1 4=BL/1 2=ML/1 2=WL/2||PG คัตเข้าแป้น::4/4 1=ML/4 1=DL/1
5-Out Motion (3 ทางเลือก)|B|หลายตัวเลือก (สวิงบอล)|mot,spt,cut|T,WL,WR,CL,CR|1/1 1=SL|สวิงหามุมซ้ายยิง::2/4||ไดรฟ์แล้วคิกขวา::1 1=UR/1 1=DR/3||SG คัตหลังประตู::1 2=ML/1 2=DL/2
Elbow Set (3 ทางเลือก)|B|หลายตัวเลือก (เอลโบว์)|pst,cut,spt|T,WL,WR,CL,EL|1/5|C โพสต์เข้าเลย์อัพ::5 5=BL/5 5=DL||ส่งมุมซ้ายให้ PF ยิง::4||SG คัตรับจาก C::5 2=ML/2 2=DL
Spain PnR (3 ทางเลือก)|B|หลายตัวเลือก (Spain)|pnr,scr,spt|T,WL,CR,ER,HP|1/1 5=UL|โรลลงแป้น::1 1=EL 5=R/5||ป๊อปยิงสามแต้ม::1 1=SR/5 5=AL||คิกมุมขวา::1 1=EL 5=R/3
Pistol Set (3 ทางเลือก)|N|หลายตัวเลือก (Pistol)|pnr,dho,iso|T,WL,WR,CR,SL|1/1 1=UL|ไดรฟ์ขึ้นแป้น::1 1=DL/1||คิกให้ SG ปีกยิง::2||C โรลหลังสกรีน::1 5=BL/5 5=R
Elevator Set (3 ทางเลือก)|B|หลายตัวเลือก (Elevator)|scr,spt|T,CL,CR,BL,BR|1/1 2=ML 3=MR|SG ยิงสามฝั่งซ้าย::1 2=AL/2||SF ยิงสามฝั่งขวา::1 3=AR/3||PG ไดรฟ์กลาง::1 1=EL/1 1=DL
DHO Set (3 ทางเลือก)|B|หลายตัวเลือก (แฮนด์ออฟ)|dho,spt,iso|WL,T,CR,CL,HP|2/1 1=SL|รับแฮนด์ออฟแล้วไดรฟ์::1 1=EL/1 1=DL||ส่งให้ C ที่โพสต์::5/5 5=DL||คิกมุมขวายิง::1 1=UR/3
Triangle Set (3 ทางเลือก)|B|หลายตัวเลือก (Triangle)|pst,cut,mot|T,WL,CR,BL,HP|1/5|สปลิตคัต PG::5 1=EL/1 1=DL||ส่งให้ PF ใต้แป้น::5 4=DL/4||คิกออกปีกยิงสาม::2
Chicago Set (3 ทางเลือก)|B|หลายตัวเลือก (Chicago)|scr,dho,spt|T,CL,WR,EL,HP|1/1 2=BL|SG ผ่านพินดาวน์ยิงปีก::1 2=ML/1 2=WL/2||C โรลหลังแฮนด์ออฟ::1 5=SL/1 1=ER 5=R/5||PG ไดรฟ์::1 1=UL/1 1=DL
Box Set (3 ทางเลือก)|F|หลายตัวเลือก (Box)|cut,pst,spt|T,BL,BR,EL,ER|1/1 4=HP|SG คัตรับใต้แป้น::4 2=DL/2||C ไฮโลคัต::4 5=R/5||ปีกขวายิงสาม::1 3=AR/3
3x3 Two-Man Game|F|หลายตัวเลือก (3x3)|pnr,spt|T,WL,HP,Z1,Z2|1/1 3=UL|โรลลงแป้น::1 1=EL 3=R/3||ป๊อปยิง::1 1=SL 3=AL/3||ปีกยิงสามแต้ม::2
3x3 Spread|F|หลายตัวเลือก (3x3)|iso,spt,mot|T,WL,WR,Z1,Z2|1/1 1=SL|ไดรฟ์ขึ้นแป้น::1 1=UL/1 1=DL||ส่งปีกซ้ายยิง::2||ส่งปีกขวายิง::3`;
function stepsFrom(ps,s){return s.split('/').map(q=>{const t=q.split(' '),mv=t.slice(1);ps=ps.slice();mv.forEach(m=>{const[a,b]=m.split('=');ps[a-1]=SP[b]});return{ball:+t[0],pos:ps.slice(),note:POS[t[0]-1]+' ถือบอล'+mv.map(m=>{const[a,b]=m.split('=');return' · '+POS[a-1]+'→'+SP[b][2]}).join('')}})}
const MOL=MO.split('\n').map((s,i)=>{const q=s.split('|'),ps=q[4].split(',').map(k=>SP[k]),root=stepsFrom(ps,q[5]),end=root[root.length-1].pos,opts=q[6].split('||').map(o=>{const[l,st]=o.split('::');return{label:l,steps:stepsFrom(end,st)}});return{id:'MO'+i,lg:q[1],name:q[0],kind:q[2],tags:q[3].split(','),steps:root,opts,n:q[0].startsWith('3x3')?3:5}});
function evalP(p,d,rn){rn=rn||MID;if(p.opts){let b=null;p.opts.forEach(o=>{const e=shot(Object.assign({},p,{steps:p.steps.concat(o.steps)}),d,rn,S.lg);if(!b||e.ep>b.ep)b=e});return b}return shot(p,d,rn,S.lg)}
const GEN=PL.split('\n').map(gen).concat(OBL,P3L,MOL);
function defT(d,off,b,rn,bi){return d.a.map((t,i)=>{if(t==='X')return[-30,i];if(/^M[\d.]/.test(t)){const o=off[i],dx=HX-o[0],dz=-o[1],l=Math.hypot(dx,dz)||1,g=parseFloat(t.slice(1))*(i===bi?.7:1)+rn[i]*.4;return[o[0]+dx/l*g+(b[0]-o[0])*.05,o[1]+dz/l*g+(b[1]-o[1])*.05]}
let a=SP[t],x=a[0]+(rn[i]-.5)*.5,z=a[1]+b[1]*.25;if(S.lg==='NBA'&&x<5.8&&Math.abs(z)<2.45)z=(b[1]>=0?1:-1)*2.7;return[x,z]})}
function shot(p,d,rn,lg){const L=p.steps[p.steps.length-1],s=L.pos[L.ball-1],D=defT(d,L.pos,s,rn,L.ball-1),dd=Math.min(...D.map(q=>Math.hypot(q[0]-s[0],q[1]-s[1]))),dist=Math.hypot(s[0]-HX,s[1]),th=dist>AR()[0]||Math.abs(s[1])>=AR()[1]+.05;
const pr=cl((th?.36:dist<2.5?.62:.42)+cl((dd-1.2)*.06,-.1,.16)+radj(L.ball-1,th,dist,d),.1,.8),pt=S.n===3?(th?2:1):(th?3:2);return{p:pr,pt,ep:pr*pt,d:dd,dist,th,sh:L.ball}}
// ---------- scene (broadcast / NBA2K style)
const cv=$('c'),R=new THREE.WebGLRenderer({canvas:cv,antialias:true}),sc=new THREE.Scene(),cam=new THREE.PerspectiveCamera(34,1,.1,200);
R.setPixelRatio(Math.min(devicePixelRatio,2));R.shadowMap.enabled=true;R.shadowMap.type=THREE.PCFSoftShadowMap;R.toneMapping=THREE.ACESFilmicToneMapping;R.toneMappingExposure=1.15;R.outputEncoding=THREE.sRGBEncoding;sc.background=new THREE.Color(0x05070d);
const mkT=k=>{const t=new THREE.CanvasTexture(k);t.encoding=THREE.sRGBEncoding;t.anisotropy=8;return t};
const cvs=(w,h,f)=>{const k=document.createElement('canvas');k.width=w;k.height=h;f(k.getContext('2d'),w,h);return mkT(k)};
const ST=(c,r)=>new THREE.MeshStandardMaterial({color:c,roughness:r==null?.6:r,metalness:0});
sc.add(new THREE.HemisphereLight(0xdfe8ff,0x3a2a1a,.6),new THREE.AmbientLight(0xffffff,.25));
const dl=new THREE.DirectionalLight(0xfff4e0,1.1);dl.position.set(8,22,8);dl.castShadow=true;dl.shadow.mapSize.set(2048,2048);Object.assign(dl.shadow.camera,{left:-14,right:14,top:14,bottom:-14,far:60});dl.shadow.bias=-.0005;dl.target.position.set(7,0,0);sc.add(dl,dl.target);
[[3,-4],[3,4],[11,-4],[11,4]].forEach(([x,z])=>{const s=new THREE.SpotLight(0xffffff,.5,45,.7,.6);s.position.set(x,16,z);s.target.position.set(x,0,z);sc.add(s,s.target)});
const CK=40,cc=document.createElement('canvas');cc.width=18*CK;cc.height=19*CK;const cx=cc.getContext('2d'),ctex=mkT(cc);
function court(){const X=cx,w=cc.width,h=cc.height,px=x=>(x+2)*CK,py=z=>(z+9.5)*CK;
for(let j=0;j<h/4;j++){X.fillStyle=`hsl(${32+Math.random()*4},${55+Math.random()*8}%,${50+Math.random()*7}%)`;X.fillRect(0,j*4,w,4);X.fillStyle='rgba(60,30,5,.25)';X.fillRect(0,j*4,w,1)}
X.fillStyle='rgba(20,10,0,.4)';X.fillRect(0,0,w,py(-7.5));X.fillRect(0,py(7.5),w,h);X.fillRect(0,0,px(0),h);X.fillRect(px(14),0,w,h);
X.fillStyle='#1c3f94';X.fillRect(px(0),py(-2.45),5.8*CK,4.9*CK);X.strokeStyle='#fff';X.lineWidth=3;X.strokeRect(px(0),py(-7.5),14*CK,15*CK);X.strokeRect(px(0),py(-2.45),5.8*CK,4.9*CK);
X.beginPath();X.arc(px(5.8),py(0),1.8*CK,0,6.3);X.stroke();X.beginPath();X.arc(px(14),py(0),1.8*CK,Math.PI/2,Math.PI*1.5);X.stroke();
const[r,zc]=AR(),a=Math.asin(zc/r);X.beginPath();X.moveTo(px(0),py(-zc));X.lineTo(px(HX+r*Math.cos(a)),py(-zc));X.arc(px(HX),py(0),r*CK,-a,a);X.lineTo(px(0),py(zc));X.stroke();
X.fillStyle='rgba(255,255,255,.9)';X.font=`bold ${CK*.8}px sans-serif`;X.textAlign='center';X.save();X.translate(px(2.9),py(0));X.rotate(-Math.PI/2);X.fillText('HOOPS LAB',0,CK*.28);X.restore();ctex.needsUpdate=true}
function arc(){court()}
const fl=new THREE.Mesh(new THREE.PlaneGeometry(18,19),new THREE.MeshStandardMaterial({map:ctex,roughness:.32,metalness:.05}));fl.rotation.x=-Math.PI/2;fl.position.set(7,0,0);fl.receiveShadow=true;sc.add(fl);
const dk=new THREE.Mesh(new THREE.PlaneGeometry(120,90),ST(0x0a0d14));dk.rotation.x=-Math.PI/2;dk.position.set(7,-.05,0);sc.add(dk);
const crowd=cvs(512,128,(x,w,h)=>{x.fillStyle='#10131c';x.fillRect(0,0,w,h);for(let i=0;i<1400;i++){x.fillStyle=`hsl(${Math.random()*360},45%,${25+Math.random()*30}%)`;x.beginPath();x.arc(Math.random()*w,Math.random()*h,2.2,0,7);x.fill()}});
[[7,-15,0],[7,15,Math.PI],[-9,0,Math.PI/2],[23,0,-Math.PI/2]].forEach(([x,z,r])=>{const m=new THREE.Mesh(new THREE.PlaneGeometry(70,12),new THREE.MeshBasicMaterial({map:crowd,color:0x999999}));m.position.set(x,6,z);m.rotation.y=r;sc.add(m)});
const led=cvs(1024,64,(x,w,h)=>{x.fillStyle='#0b1b3a';x.fillRect(0,0,w,h);x.fillStyle='#fff';x.font='bold 34px sans-serif';x.fillText('HOOPS LAB ★ NBA ★ FIBA ★ PRO ANALYTICS ★ HOOPS LAB ★ NBA ★ FIBA',10,44)});
[[7,-8.8,0,18],[7,8.8,Math.PI,18],[-2.6,0,Math.PI/2,16]].forEach(([x,z,r,w])=>{const m=new THREE.Mesh(new THREE.PlaneGeometry(w,1),new THREE.MeshBasicMaterial({map:led}));m.position.set(x,.55,z);m.rotation.y=r;sc.add(m)});
const bb=new THREE.Mesh(new THREE.BoxGeometry(.05,1.05,1.8),new THREE.MeshStandardMaterial({color:0xcfe6ff,transparent:true,opacity:.35,roughness:.1}));bb.position.set(1.2,3.5,0);bb.castShadow=true;sc.add(bb);
const pole=new THREE.Mesh(new THREE.CylinderGeometry(.08,.08,3.6,10),ST(0x2a2f3a,.4));pole.position.set(-.45,1.8,0);sc.add(pole);const arm=new THREE.Mesh(new THREE.BoxGeometry(1.5,.1,.1),ST(0x2a2f3a,.4));arm.position.set(.3,3.5,0);sc.add(arm);
const rim=new THREE.Mesh(new THREE.TorusGeometry(.23,.02,8,24),ST(0xff5a1f,.4));rim.rotation.x=Math.PI/2;rim.position.set(HX,3.05,0);sc.add(rim);
const net=new THREE.Mesh(new THREE.CylinderGeometry(.23,.13,.4,12,1,true),new THREE.MeshBasicMaterial({color:0xffffff,wireframe:true,transparent:true,opacity:.7}));net.position.set(HX,2.85,0);sc.add(net);
const numT=(n,fg)=>cvs(64,64,x=>{x.fillStyle=fg;x.font='bold 46px sans-serif';x.textAlign='center';x.fillText(n,32,48)});
function limb2(g,x,y,l1,l2,r1,r2,m1,m2,hand,sl){const a=new THREE.Group();a.position.set(x,y,0);g.add(a);const A=(geo,m,yy,p)=>{const e=new THREE.Mesh(geo,m);e.position.y=yy;p.add(e);return e};
A(new THREE.CylinderGeometry(r1,r1*.88,l1,12),m1,-l1/2,a);A(new THREE.SphereGeometry(r1*.9,12,10),m1,-l1,a);const b=new THREE.Group();b.position.y=-l1;a.add(b);
A(new THREE.CylinderGeometry(r2,r2*.8,l2,12),m2,-l2/2,b);if(sl)A(new THREE.CylinderGeometry(r2*1.14,r2*1.02,l2*.7,12),sl,-l2*.4,b);if(hand)A(new THREE.SphereGeometry(hand,12,10),m2,-l2-hand*.4,b);return{r:a,m:b,b}}
const LK=[{s:0x6b3f26,h:'short',b:1,band:1,sl:1},{s:0xe8b98f,h:'short',b:0,band:0,sl:0},{s:0x4b2e1c,h:'afro',b:1,band:0,sl:1},{s:0x8d5524,h:'bun',b:1,band:1,sl:0},{s:0xf1c9a5,h:'short',b:0,band:0,sl:0},
{s:0x5c3a21,h:'short',b:1,band:0,sl:1},{s:0xc68642,h:'bald',b:1,band:1,sl:0},{s:0x3b2417,h:'afro',b:0,band:1,sl:0},{s:0xe0ac69,h:'short',b:1,band:0,sl:1},{s:0x7a4a2b,h:'bun',b:0,band:0,sl:0}];
function mkP(n,pn,jc,i,L){const g=new THREE.Group(),U=g.userData={id:Math.random()*6,ry:0,ph:0,sm:0},red=jc===0xc4122f,sk=ST(L.s,.5),jm=ST(jc,.5),hm=ST(0x15110d,.7),wm=ST(0xffffff,.5),dk=ST(0x15110d,.6);U.jm=jm;
const SG=r=>new THREE.SphereGeometry(r,18,14),M=(geo,m,x,y,z,s)=>{const e=new THREE.Mesh(geo,m);e.position.set(x,y,z);if(s)e.scale.set(...s);g.add(e);return e};
M(SG(1),jm,0,1.36,0,[.31,.40,.21]);M(SG(1),jm,0,.99,0,[.29,.24,.22]);M(SG(1),sk,0,1.62,.1,[.12,.1,.08]);M(new THREE.CylinderGeometry(.07,.085,.12,12),sk,0,1.74,0);
M(SG(.2),sk,0,1.92,0,[1,1.08,1.02]);
[-1,1].forEach(s=>{M(SG(.036),wm,s*.075,1.95,.175);M(SG(.02),dk,s*.075,1.95,.205);M(new THREE.BoxGeometry(.07,.014,.014),dk,s*.075,2.0,.19).rotation.z=s*.15;M(SG(.04),sk,s*.2,1.92,0,[.6,1,1]);M(SG(.115),sk,s*.37,1.6,0)});
M(SG(.03),sk,0,1.9,.2);M(new THREE.TorusGeometry(.055,.009,6,12,Math.PI),ST(0x7a2a22,.6),0,1.86,.195).rotation.z=Math.PI;
if(L.h==='short'||L.h==='bun')M(new THREE.SphereGeometry(.21,18,10,0,6.3,0,1.3),hm,0,1.95,-.005,[1,1.06,1.03]);if(L.h==='afro')M(SG(.27),hm,0,2,-.03,[1,.95,1]);if(L.h==='bun')M(SG(.08),hm,0,2.17,-.05);
if(L.b){M(new THREE.SphereGeometry(.205,18,10,0,6.3,1.85,.95),hm,0,1.92,.01,[1,1.08,1.04]);M(new THREE.BoxGeometry(.1,.018,.02),hm,0,1.885,.2)}
if(L.band)M(new THREE.TorusGeometry(.205,.024,8,24),wm,0,1.99,0,[1,1,1.03]).rotation.x=Math.PI/2;
const pm=new THREE.MeshBasicMaterial({map:numT(n,'#fff'),transparent:true});M(new THREE.PlaneGeometry(.24,.24),pm,0,1.4,.218);M(new THREE.PlaneGeometry(.24,.24),pm,0,1.4,-.218).rotation.y=Math.PI;
U.A=[-1,1].map(s=>limb2(g,s*.37,1.6,.32,.3,.075,.062,sk,sk,.08,L.sl?wm:null));
U.L=[-1,1].map(s=>{const l=limb2(g,s*.12,.97,.47,.45,.115,.085,sk,sk,0,null),e=new THREE.Mesh(SG(1),ST(0xffffff,.45));e.scale.set(.075,.06,.18);e.position.set(0,-.47,.07);l.b.add(e);return l});
const rc=red?0xffb703:0xff4d4d;U.r=new THREE.Mesh(new THREE.RingGeometry(.45,.58,28),new THREE.MeshBasicMaterial({color:rc,side:2,transparent:true,opacity:.85}));U.r.rotation.x=-Math.PI/2;g.add(U.r);
const lb=new THREE.Sprite(new THREE.SpriteMaterial({map:cvs(128,64,x=>{x.fillStyle=red?'rgba(196,18,47,.92)':'rgba(14,59,140,.92)';x.fillRect(8,10,112,44);x.fillStyle='#fff';x.font='bold 32px sans-serif';x.textAlign='center';x.fillText(pn,64,44)}),depthTest:false}));lb.scale.set(.85,.42,1);lb.position.y=2.45;g.add(lb);
g.traverse(e=>{if(e.isMesh)e.castShadow=true});sc.add(g);return g}
const OF=[1,7,23,4,34].map((n,i)=>mkP(n,POS[i],0xc4122f,i,LK[i])),DFN=[3,11,8,15,21].map((n,i)=>mkP(n,POS[i],0x0e3b8c,i+5,LK[i+5]));
function anim(g,x,z,tx,tz,dt,o){const v=g.userData;if(v.px==null){v.px=x;v.pz=z}const dx=x-v.px,dz=z-v.pz,sp=Math.min(Math.hypot(dx,dz)/Math.max(dt,.001),9);v.px=x;v.pz=z;v.sm+=(sp-v.sm)*.15;const spd=v.sm,tt=performance.now()/1000;
const ds=(o.face||spd<.5)?Math.atan2(tx-x,tz-z):Math.atan2(dx,dz);let d=ds-v.ry;v.ry+=Math.atan2(Math.sin(d),Math.cos(d))*Math.min(1,dt*9);g.rotation.y=v.ry;v.ph+=spd*dt*(o.df?3:2.4);
const run=cl(spd/3.2,0,1),st=o.df?1-cl((spd-4.8)/1.4,0,1):0,w=Math.sin(v.ph*2),idle=o.df?0:1-run,sh=o.sh;
v.L.forEach((l,k)=>{const s=k?1:-1,sw=k?w:-w;l.r.rotation.x=(o.df?-.75*st+(1-st)*sw*.9:sw*.9*run-.1*idle)+(sh?-.3:0);l.m.rotation.x=(o.df?1.3*st+(1-st)*Math.max(0,-sw)*1.2:Math.max(0,-sw)*1.2*run+.2*idle)+(sh?.5:0);l.r.rotation.z=o.df?s*.24*st+Math.sin(v.ph*2+k*3.14)*.22*cl(spd/2.5,0,1)*st:0});
v.A.forEach((a,k)=>{const s=k?1:-1,sw=k?-w:w;let rx=sw*.7*run+.1*idle,rz=0,mx=-.5-.5*run;
if(o.df){rx=-.5*st+(1-st)*sw*.7;rz=s*(.95*st+Math.sin(tt*5+v.id+k)*.12*st);mx=-1.1*st-.5*(1-st)}
if(o.dr>=0&&k){rx=-.4-.5*o.dr;mx=-.7-.4*o.dr}
if(sh){rx=-2.8;mx=o.u>.4?-.15:-.5;rz=0}
a.r.rotation.set(rx,0,rz);a.m.rotation.x=mx});
const jmp=sh?Math.sin(Math.PI*cl(o.u,0,1))*.5:0;g.position.set(x,jmp-(o.df?.19*st:0)-.03*idle+(o.df?Math.sin(tt*6+v.id)*.012*st:0),z);v.r.position.y=.03-g.position.y}
const bt=cvs(256,128,(x,w,h)=>{x.fillStyle='#cf6a1c';x.fillRect(0,0,w,h);x.strokeStyle='#1a0d05';x.lineWidth=3;[0,w/2,w].forEach(a=>{x.beginPath();x.moveTo(a,0);x.lineTo(a,h);x.stroke()});x.beginPath();x.moveTo(0,h/2);x.lineTo(w,h/2);x.stroke()});
const bg=new THREE.Mesh(new THREE.SphereGeometry(.12,20,16),new THREE.MeshStandardMaterial({map:bt,roughness:.65}));bg.castShadow=true;sc.add(bg);
const arw=new THREE.Mesh(new THREE.ConeGeometry(.13,.3,8),new THREE.MeshBasicMaterial({color:0xffb703}));arw.rotation.x=Math.PI;sc.add(arw);
const hc=document.createElement('canvas');hc.width=56;hc.height=60;const hx=hc.getContext('2d'),ht=mkT(hc),hm=new THREE.Mesh(new THREE.PlaneGeometry(14,15),new THREE.MeshBasicMaterial({map:ht,transparent:true,depthWrite:false}));hm.rotation.x=-Math.PI/2;hm.position.set(7,.015,0);hm.visible=false;sc.add(hm);
const bm2=new THREE.Mesh(new THREE.CylinderGeometry(.35,.35,6,16,1,true),new THREE.MeshBasicMaterial({color:0x35e07a,transparent:true,opacity:.3,depthWrite:false,side:2}));bm2.visible=false;sc.add(bm2);
let bl=null,pa=null;const V=a=>new THREE.Vector3(a[0],.08,a[1]);
const OV=[0,1,2,3,4].map(()=>({x:0,z:0,s:0,px:null,pz:null}));
function holder(T){const st=S.p.steps,n=st.length-1;if(T>=n)return st[n].ball-1;const k=Math.floor(T);return(T-k>.5?st[k+1]:st[k]).ball-1}
function posAt(T){const st=S.p.steps,n=st.length-1;if(T>=n)return st[n].pos;const k=Math.floor(T),f=T-k,mv=(p,q)=>Math.hypot(p[0]-q[0],p[1]-q[1])>.01;
return st[k].pos.map((a,i)=>{const b=st[k+1].pos[i];if(!mv(a,b))return a;const pr=st[Math.max(k-1,0)].pos[i],nx=st[Math.min(k+2,n)].pos[i],
m0=(k>0&&mv(pr,a))?[(b[0]-pr[0])/2,(b[1]-pr[1])/2]:[0,0],m1=(k+1<n&&mv(b,nx))?[(nx[0]-a[0])/2,(nx[1]-a[1])/2]:[0,0],f2=f*f,f3=f2*f,h0=2*f3-3*f2+1,h1=f3-2*f2+f,h2=-2*f3+3*f2,h3=f3-f2;
return[h0*a[0]+h1*m0[0]+h2*b[0]+h3*m1[0],h0*a[1]+h1*m0[1]+h2*b[1]+h3*m1[1]]})}
function fdir(j,P){const q=OV[j];if(q.s>.8)return[q.x/q.s,q.z/q.s];const l=Math.hypot(HX-P[j][0],P[j][1])||1;return[(HX-P[j][0])/l,-P[j][1]/l]}
function held(j,P,wm){const f=fdir(j,P),p=P[j],w=cl(OV[j].s/1,0,1)*wm,hx=p[0]+f[0]*.35,hz=p[1]+f[1]*.35,dx=p[0]+f[0]*.38+f[1]*.2,dz=p[1]+f[1]*.38-f[0]*.2,dy=.12+.88*Math.abs(Math.cos(S.clk*6.9));
return[hx+(dx-hx)*w,1.15+(dy-1.15)*w,hz+(dz-hz)*w]}
function ptype(pa,pb,dist){if(!S.D)return'c';let m=9;S.D.forEach(o=>{if(o.x<0||Math.hypot(o.x-pa[0],o.z-pa[1])<.7||Math.hypot(o.x-pb[0],o.z-pb[1])<.7)return;m=Math.min(m,segD(o.x,o.z,pa,pb))});return dist>9?'l':m<1?'b':'c'}
function ballAt(T){const st=S.p.steps,n=st.length-1,P=posAt(T),sh=S.shoot!==false;
if(T>=n){const j=st[n].ball-1;if(!sh)return held(j,P,1);const u=Math.min(T-n,1),p=P[j],f=fdir(j,P),w=cl((T-n-1)/.25,0,1),dist=Math.hypot(p[0]-HX,p[1]);let x,y,z;
if(u<.3){const e=sm(u/.3);x=p[0]+f[0]*(.35-.25*e);z=p[1]+f[1]*(.35-.25*e);y=1.15+1.2*e}else{const g=(u-.3)/.7;x=p[0]+(HX-p[0])*g;z=p[1]*(1-g);y=2.35+.7*g+Math.sin(Math.PI*g)*(1.2+.1*dist);
if(S.blk){y=Math.max(.14,2.4-g*3.4);x=p[0]+f[0]*g*2.2;z=p[1]+f[1]*g*2.2}}
if(w>0&&!S.blk){y=3.05-w*(S.made?2.8:2.4);if(!S.made){x+=w*.9;z+=w*.6}}return[x,y,z]}
const k=Math.floor(T),f=T-k,a=st[k].ball-1,b=st[k+1].ball-1;if(a===b)return held(a,P,1);
const pa=P[a],pb=P[b],dist=Math.hypot(pa[0]-pb[0],pa[1]-pb[1]),pf=cl(dist*.05,.16,.6),f0=.08,f1=f0+pf;
if(f<f0)return held(a,P,cl(1-f/f0,0,1));if(f>f1)return held(b,P,cl((f-f1)/.12,0,1));
const pt=st[k+1].pt||(st[k+1].pt=ptype(pa,pb,dist)),g=(f-f0)/pf,A=held(a,P,0),l=dist||1,cx=pb[0]+(pa[0]-pb[0])/l*.3,cz=pb[1]+(pa[1]-pb[1])/l*.3;let y;
if(pt==='b')y=g<.55?1.1+(.15-1.1)*g/.55:.15+(1.2-.15)*(g-.55)/.45;else if(pt==='l')y=1.3+Math.sin(Math.PI*g)*(1.8+dist*.12);else y=1.15+.05*g+Math.sin(Math.PI*g)*.25;
return[A[0]+(cx-A[0])*g,y,A[2]+(cz-A[2])*g]}
function paths(){const n=S.p.steps.length-1;if(bl)sc.remove(bl);if(pa)sc.remove(pa);const a=[];for(let i=0;i<=120;i++){const T=i/120*n;a.push(V(posAt(T)[holder(T)]))}
bl=new THREE.Line(new THREE.BufferGeometry().setFromPoints(a),new THREE.LineBasicMaterial({color:0xffa94d}));sc.add(bl);
const b=[];for(let i=0;i<=80;i++)b.push(V(posAt(i/80*n)[S.sel-1]));pa=new THREE.Line(new THREE.BufferGeometry().setFromPoints(b),new THREE.LineBasicMaterial({color:0x3bc9db}));pa.visible=S.tab==='pos';sc.add(pa)}
// camera
const C={th:Math.PI/2,ph:1.1,r:38,tx:13,auto:0},CPF={p:[Math.PI/2,1.1,38,13],t:[1.57,.02,34,13],s:[0,1.2,19,10],b:[3.14,1.2,14,6],c:[1.2,1.1,24,10]},CPH={p:[Math.PI/2,1.12,21,6.5],t:[1.57,.02,24,7],s:[0,1.25,13,5],b:[3.14,1.2,13,6],c:[1.2,1.15,17,7]};
function setCam(k){[C.th,C.ph,C.r,C.tx]=(S.full?CPF:CPH)[k];C.auto=k==='c'}
function camU(t){if(C.auto){C.th=1.57+Math.sin(t*.0002)*.7;C.tx+=(S.bx*.6+(S.full?4:3.5)-C.tx)*.03}cam.position.set(C.tx+C.r*Math.sin(C.ph)*Math.cos(C.th),C.r*Math.cos(C.ph),C.r*Math.sin(C.ph)*Math.sin(C.th));if(S.sh>0){cam.position.x+=(Math.random()-.5)*S.sh*.3;cam.position.y+=(Math.random()-.5)*S.sh*.3}cam.lookAt(C.tx,.8,0)}
let dr=null;cv.onpointerdown=e=>{dr=[e.clientX,e.clientY];C.auto=0};addEventListener('pointerup',()=>dr=null);
addEventListener('pointermove',e=>{if(!dr)return;C.th-=(e.clientX-dr[0])*.008;C.ph=cl(C.ph-(e.clientY-dr[1])*.006,.02,1.5);dr=[e.clientX,e.clientY]});
cv.onwheel=e=>{e.preventDefault();C.r=cl(C.r+e.deltaY*.01,6,50)};
function rs(){const w=cv.clientWidth,h=cv.clientHeight;R.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix()}new ResizeObserver(rs).observe(cv);
// ---------- UI
function metrics(){const st=S.p.steps,n=st.length-1;let bd=0,pas=0,pd=[0,0,0,0,0],tc=[0,0,0,0,0],pv=null;for(let i=0;i<=120;i++){const T0=i/120*n,q=posAt(T0)[holder(T0)];if(pv)bd+=Math.hypot(q[0]-pv[0],q[1]-pv[1]);pv=q}
st.forEach((s,k)=>{tc[s.ball-1]++;if(k&&s.ball!==st[k-1].ball)pas++;if(k)s.pos.forEach((p,i)=>pd[i]+=Math.hypot(p[0]-st[k-1].pos[i][0],p[1]-st[k-1].pos[i][1]))});S.m={bd,pa:pas,pd,tc}}
function pickD(){S.d=S.df==='r'?DEFS[Math.random()*DEFS.length|0]:DEFS[+S.df];$('dn').innerHTML=`🛡 <b>${S.d.name}</b> (${LB[S.d.lg]}) — ${S.d.note}`}
function fresh(){if(!VS.on)S.match=[0,1,2,3,4];const o0=DB.find(p=>p.id===(S.vsId||$('pl').value))||DB.find(p=>(p.n||5)===S.n),o=S.vsPos!=null?swapPlay(o0,S.vsPos):o0,s0=o.steps[0];S.p=Object.assign({},o,{steps:S.full?[{ball:s0.ball,pos:s0.pos.map(q=>q[0]<0?q:[q[0]+11,q[1]]),note:'ขึ้นบอลข้ามครึ่งสนาม'}].concat(o.steps):o.steps});S.T=0;S.chk=-1;S.stl=null;S.blk=0;S.shoot=S.p.opts?false:true;S.idle=false;S.optDone=false;S.chk2=-1;S.made=null;S.D=null;S.fx=0;S.tr=1;pickD();S.rnd=S.rnd.map(()=>Math.random());S.ev=evalP(S.p,S.d,S.rnd);metrics();paths();if(bl)bl.visible=true;tab();renderDc()}
function fill(){const op=p=>`<option value="${p.id}">${p.name}</option>`;$('pl').innerHTML='<optgroup label="แผนหลัก">'+DB.filter(p=>(p.n||5)===S.n&&!p.id.startsWith('OB')).map(op).join('')+'</optgroup><optgroup label="Off-ball (ไม่มีบอล)">'+DB.filter(p=>(p.n||5)===S.n&&p.id.startsWith('OB')).map(op).join('')+'</optgroup>';$('df').innerHTML=DEFS.map((d,i)=>`<option value="${i}">${d.name}</option>`).join('')+'<option value="r">🎲 สุ่มแผนรับ</option>'}
function role(i){const L=S.p.steps[S.p.steps.length-1];return L.ball===i+1?'ผู้จบเกม':S.m.tc[i]?'ผู้จ่าย/ผู้เล่นบอล':S.m.pd[i]>4?'คัตไม่มีบอล ดึงดีเฟนส์':'สเปซซิ่ง/ตั้งสกรีน'}
function tab(){const p=S.p,t=S.tab,el=$('tab');pa&&(pa.visible=t==='pos');S.ci=-1;if(t==='vs'){renderVs();return}
if(t==='ball')el.innerHTML=`<p class="mut">${p.kind} · ${p.tags.map(x=>TN[x]).join(', ')}</p><div class="kpi"><div><b>${S.m.pa}</b>จำนวนจ่าย</div><div><b>${S.m.bd.toFixed(1)} ม.</b>ระยะบอล</div><div><b>${p.steps.length}</b>จังหวะ</div></div>`+p.steps.map((s,i)=>`<div class="st" data-i="${i}"><b>${i+1}</b> <span class="tag">${POS[s.ball-1]}</span> ${s.note}</div>`).join('');
else if(t==='pos'){const i=S.sel-1,L=p.steps[p.steps.length-1],D=defT(S.d,L.pos,L.pos[L.ball-1],MID,L.ball-1),o=Math.min(...D.map(q=>Math.hypot(q[0]-L.pos[i][0],q[1]-L.pos[i][1])));
el.innerHTML=`<div class="row">${POS.slice(0,S.n).map((n,k)=>`<button data-s="${k+1}" class="${k===i?'on':''}">${k+1} ${n}</button>`).join('')}</div><p><b>${POS[i]}</b> — ${ROLE[i]}</p><div class="kpi"><div><b>${S.m.pd[i].toFixed(1)} ม.</b>ระยะเคลื่อนที่</div><div><b>${S.m.tc[i]}</b>จังหวะถือบอล</div><div><b>${o.toFixed(1)} ม.</b>ระยะเปิดตอนจบ</div></div><p>บทบาท: <span class="tag">${role(i)}</span></p><p class="mut">${S.m.tc[i]?'มีบอล: ไดรฟ์ ชะลอจังหวะ ดึงช่วยแล้วจ่าย':'ไม่มีบอล: คัต สกรีน ตัดมุมดีเฟนส์ ปรับระยะให้เปิดก่อนรับ'} · เส้นฟ้า = เส้นทางผู้เล่น</p>`}
else if(t==='eff'){const e=S.ev,L=p.steps[p.steps.length-1].pos.slice(0,S.n),sp=L.map((a,i)=>Math.min(...L.filter((_,j)=>j!==i).map(b=>Math.hypot(a[0]-b[0],a[1]-b[1])))).reduce((a,b)=>a+b)/S.n,
rk=DEFS.map(d=>[d,evalP(p,d)]).sort((a,b)=>b[1].ep-a[1].ep),row=([d,v])=>`<div>${d.name} · ${v.ep.toFixed(2)}</div><div class="br"><i style="width:${v.ep/1.9*100}%"></i></div>`;
el.innerHTML=`<p><span class="tag">${p.kind}</span> ผู้ยิง ${POS[e.sh-1]} · ${e.th?'3 แต้ม':'2 แต้ม'} · ${e.dist.toFixed(1)} ม.</p><div class="kpi"><div><b>${e.p*100|0}%</b>โอกาสเข้า</div><div><b>${e.ep.toFixed(2)}</b>คะแนนคาดหวัง</div><div><b>${sp.toFixed(1)} ม.</b>สเปซซิ่ง</div></div><p class="mut">ผู้ป้องกันใกล้สุด ${e.d.toFixed(1)} ม. · ${e.ep>=1.2?'ยอดเยี่ยม':e.ep>=1?'ดี':'ควรปรับแผน'}</p><b>แผนรับที่โดนแผนนี้เล่นงานง่ายสุด</b>${rk.slice(0,3).map(row).join('')}<b>แผนรับที่หยุดแผนนี้ได้ดีสุด</b>${rk.slice(-3).reverse().map(row).join('')}<div class="row"><button id="sim">⚙ จำลอง 300 ครั้ง (สุ่มแผนรับ)</button></div><div id="so" class="mut"></div>`;
$('sim').onclick=()=>{let pt=0,mk=0;for(let i=0;i<300;i++){const v=shot(p,DEFS[Math.random()*DEFS.length|0],S.rnd.map(Math.random),S.lg);if(Math.random()<v.p){mk++;pt+=v.pt}}$('so').textContent=`เข้า ${mk}/300 (${(mk/3).toFixed(0)}%) · เฉลี่ย ${(pt/300).toFixed(2)} แต้ม/ครั้ง`}}
else{const D=S.d,rk=DB.filter(q=>(q.n||5)===S.n).map(q=>{const e=evalP(q,D),m=q.tags.filter(x=>D.beats.includes(x));return{q,e,m,s:e.ep+.15*m.length}}).sort((a,b)=>b.s-a.s).slice(0,6);
el.innerHTML=`<p><b>${D.name}</b> (${LB[D.lg]}) — ${D.note}</p><p class="mut">โดนเล่นงานด้วย: ${D.beats.map(x=>TN[x]).join(', ')}</p><b>เจอแผนรับนี้ ควรใช้:</b>`+rk.map(r=>`<div class="st" data-p="${r.q.id}" style="cursor:pointer"><b>${r.q.name}</b> · EP ${r.e.ep.toFixed(2)}<br><span class="mut">${r.m.map(x=>TN[x]).join(' · ')||'ได้เปรียบจากระยะยิง'}</span></div>`).join('')}}
$('pl').onchange=fresh;$('df').onchange=e=>{S.df=e.target.value;fresh()};
const PP=on=>{S.play=on;$('pp').textContent=on?'⏸ หยุด':'▶ เล่น';$('pp').classList.toggle('on',on)};
$('pp').onclick=()=>{if(S.T>=S.Tm||S.stl){S.T=0;S.made=null;S.fx=0;S.stl=null}PP(!S.play)};$('rs').onclick=()=>{S.T=0;S.made=null;S.D=null;S.fx=0;S.tr=1;PP(true)};
$('rnd').onclick=()=>{{const a=DB.filter(p=>(p.n||5)===S.n);$('pl').value=a[Math.random()*a.length|0].id}S.df='r';$('df').value='r';fresh();PP(true)};
$('sp').onchange=e=>S.sp=+e.target.value;$('sl').oninput=e=>{S.T=e.target.value/100*S.Tm;PP(false);S.fx=0;if(S.T<S.p.steps.length-1)S.made=null};
document.querySelectorAll('[data-cam]').forEach(b=>b.onclick=()=>setCam(b.dataset.cam));
document.querySelectorAll('[data-t]').forEach(b=>b.onclick=()=>{S.tab=b.dataset.t;document.querySelectorAll('[data-t]').forEach(x=>x.classList.toggle('on',x===b));tab()});
$('tab').onclick=e=>{const b=e.target.closest('[data-s]'),q=e.target.closest('[data-p]');if(b){S.sel=+b.dataset.s;paths();tab()}if(q){$('pl').value=q.dataset.p;fresh();PP(true)}};
function load(u){const base=parse(CSV).concat(GEN);DB=u?base.filter(p=>!u.some(x=>x.id===p.id)).concat(u):base;fill();fresh()}
$('ld').onclick=()=>{const d=parse($('csv').value);d.length?load(d):alert('รูปแบบ CSV ไม่ถูกต้อง')};$('fi').onchange=e=>{const f=e.target.files[0];if(f)f.text().then(t=>{$('csv').value=t;const d=parse(t);d.length&&load(d)})};
// ---------- defender AI + heatmap + loop
const IQ=[{t:1.3,v:.92,l:.1,g:1.05},{t:1,v:1,l:.22,g:.9},{t:.7,v:1.12,l:.38,g:.78}];
const U2=(a,c)=>{const l=Math.hypot(c[0]-a[0],c[1]-a[1])||1;return[(c[0]-a[0])/l,(c[1]-a[1])/l]};
const val=(x,z)=>{const dist=Math.hypot(x-HX,z),[r,zc]=AR(),th=dist>r||(Math.abs(z)>=zc+.05&&x<4.4),t3=S.n===3;return th?.36*(t3?2:3):(dist<2.5?.62:.42)*(t3?1:2)};
const segD=(x,z,a,c)=>{const dx=c[0]-a[0],dz=c[1]-a[1],l=dx*dx+dz*dz||1,t=cl(((x-a[0])*dx+(z-a[1])*dz)/l,0,1);return Math.hypot(x-a[0]-t*dx,z-a[1]-t*dz)};
function dTargets(P0,b,hi){const q=IQ[S.iq],H=P0[hi],bk=[HX,0],d=S.d,sw=/Switch|Peel/.test(d.name),hd=/Hedge|Blitz|Trap/.test(d.name),dr=/Drop/.test(d.name),asg=S.match.slice(),
PP=P0.map((p,j)=>[p[0]+OV[j].x*q.l,p[1]+OV[j].z*q.l]),stp=S.p.steps,n=stp.length-1,k=Math.min(Math.floor(S.T),n-1),inP=S.T<n&&stp[k].ball!==stp[k+1].ball&&S.T-k>.1,hn=inP?stp[k+1].ball-1:hi,uH=U2(H,bk);let scr=-1;
for(let j=0;j<5;j++)if(j!==hi&&Math.hypot(P0[j][0]-H[0],P0[j][1]-H[1])<1.7&&OV[hi].s>.3&&OV[j].s<1.2)scr=j;
if(scr>=0&&sw){const a=asg.indexOf(hi),c=asg.indexOf(scr);asg[a]=scr;asg[c]=hi}
const F=[],T=d.a.map((t,i)=>{if(t==='X'){F[i]=H;return[-30,i]}
if(/^M[\d.]/.test(t)){const m=asg[i],o=PP[m],g=parseFloat(t.slice(1)),ub=U2(o,bk),uh=U2(o,H),dh=Math.hypot(o[0]-H[0],o[1]-H[1]);F[i]=m===hi?H:[(o[0]+H[0])/2,(o[1]+H[1])/2];
if(m===hi){if(scr>=0&&!sw){const v=[OV[hi].x,OV[hi].z],l=Math.hypot(v[0],v[1])||1;return[o[0]-v[0]/l*.9+ub[0]*.3,o[1]-v[1]/l*.9+ub[1]*.3]}const gx=Math.max(.6,(.7+g*.25)*q.g);return[o[0]+ub[0]*gx,o[1]+ub[1]*gx-Math.sign(o[1]||1)*.3]}
if(inP&&m===hn){F[i]=H;return[o[0]+ub[0]*1.1,o[1]+ub[1]*1.1]}
if(m===scr&&!sw){const u=U2(H,bk);if(hd)return[H[0]+u[0]*1.5,H[1]+u[1]*1.5];if(dr)return[H[0]+u[0]*3.2,H[1]*.5];return[o[0]+(H[0]-o[0])*.4,o[1]+(H[1]-o[1])*.4]}
if(dh<6.5){const kk=cl(1.5-g*.5,.4,1.2);return[o[0]+uh[0]*kk+ub[0]*.4,o[1]+uh[1]*kk+ub[1]*.4]}
const thr=val(P0[m][0],P0[m][1]),gp=Math.max(g,.8)+.5-(thr>1&&S.iq>0?.45:0),x=o[0]+ub[0]*gp,z=o[1]+ub[1]*gp;return[x+(4.2-x)*.3,z+(H[1]*.2-z)*.3]}
const a=SP[t];F[i]=H;let x=a[0]+(H[0]-a[0])*.22,z=a[1]+(H[1]-a[1])*.3,bj=-1,bd=2.4;P0.forEach((p,j)=>{const e=Math.hypot(p[0]-x,p[1]-z);if(e<bd){bd=e;bj=j}});if(bj>=0){x+=(P0[bj][0]-x)*.45;z+=(P0[bj][1]-z)*.45}if(VS.on&&VS.focus===i&&VS.pos!=null&&P0[VS.pos]){x+=(P0[VS.pos][0]-x)*.4;z+=(P0[VS.pos][1]-z)*.4}
if(S.lg==='NBA'&&S.n===5&&x<5.8&&Math.abs(z)<2.45)z=(H[1]>=0?1:-1)*2.7;return[x,z]});
const mans=d.a.map((t,i)=>/^M[\d.]/.test(t)?asg[i]:-1),onb=mans.indexOf(hi),hr=Math.hypot(H[0]-HX,H[1]);
if(S.iq>0&&hr<3.6){let bi=-1,bd=99;T.forEach((p,i)=>{if(i===onb||p[0]<0)return;const e=Math.hypot(p[0]-HX,p[1]);if(e<bd){bd=e;bi=i}});if(bi>=0)T[bi]=[HX+.9,H[1]*.5]}
else if(S.iq>0&&hr<7&&OV[hi].s>1.4&&OV[hi].x*uH[0]+OV[hi].z*uH[1]>0){let bi=-1,bd=99;T.forEach((p,i)=>{if(i===onb||p[0]<0)return;const th=mans[i]>=0?val(P0[mans[i]][0],P0[mans[i]][1]):0;if(th>1.05&&S.iq<2)return;const e=Math.hypot(p[0]-H[0],p[1]-H[1]);if(e<bd){bd=e;bi=i}});if(bi>=0)T[bi]=[H[0]+uH[0]*1.9,H[1]+uH[1]*1.9]}
let zi=-1,zd=4.5;d.a.forEach((t,i)=>{if(t!=='X'&&!/^M[\d.]/.test(t)){const e=Math.hypot(T[i][0]-H[0],T[i][1]-H[1]);if(e<zd){zd=e;zi=i}}});if(zi>=0){const u=U2(H,bk);T[zi]=[H[0]+u[0],H[1]+u[1]]}
T.forEach(p=>{if(p[0]>-25){p[0]=cl(p[0],.4,27.6);p[1]=cl(p[1],-7.2,7.2)}});let gi=0,gd=99;T.forEach((p,i)=>{const e=Math.hypot(p[0]-H[0],p[1]-H[1]);if(e<gd){gd=e;gi=i}});return{T,F,gi}}
function epAt(x,z){const dist=Math.hypot(x-HX,z),[r,zc]=AR(),th=dist>r||(Math.abs(z)>=zc+.05&&x<4.4);let o=9;for(const q of S.D)o=Math.min(o,Math.hypot(q.x-x,q.z-z));return cl((th?.36:dist<2.5?.62:.42)+cl((o-1.2)*.06,-.1,.16),.1,.8)*(th?3:2)}
function heatU(P,hi){const im=hx.createImageData(56,60),k=S.sel-1!==hi?S.sel-1:(hi+1)%S.n;let bs=null;
for(let j=0;j<60;j++)for(let i=0;i<56;i++){const x=(i+.5)*.25,z=-7.5+(j+.5)*.25,ep=x<1.2?0:epAt(x,z),f=cl((ep-.6)/.8,0,1),o=(j*56+i)*4;im.data.set([f<.5?255:510*(1-f),f<.5?510*f:255,40,ep?125:0],o);
const d=Math.hypot(x-P[k][0],z-P[k][1]);if(ep&&d<4.5){const s=ep-.04*d;if(!bs||s>bs.s)bs={s,x,z,ep}}}
hx.putImageData(im,0,0);ht.needsUpdate=true;if(bs){bm2.position.set(bs.x,3,bs.z);$('bs').textContent=`📍 ช่องว่างดีที่สุดของ ${POS[k]}: ${SP_N(bs.x,bs.z)} · EP ${bs.ep.toFixed(2)}`}}
function SP_N(x,z){let b='',bd=99;for(const k in SP){if(SP[k][0]<0)continue;const e=Math.hypot(SP[k][0]-x,SP[k][1]-z);if(e<bd){bd=e;b=SP[k][2]}}return b+` (${x.toFixed(1)},${z.toFixed(1)})`}
const fmt=s=>{s=Math.max(0,s);return(s/60|0)+':'+String(s%60|0).padStart(2,'0')};
function showRes(t,d){$('res').className='res pop';$('res').textContent=t;S.rt=d||2.2}
let last=0,hacc=0;S.gc=480;S.sc=[0,0];S.rt=0;
function frame(t){requestAnimationFrame(frame);const dt=Math.min((t-last)/1000,.05)||.016;last=t;const p=S.p,st=p.steps,n=st.length-1,q=IQ[S.iq];S.Tm=n+1.25;S.clk+=dt*(S.play?S.sp:1);
if(S.stl&&S.T<S.stl.Tt-.01)S.stl=null;if(S.chk>=0&&S.T<S.chk+.4)S.chk=-1;if(S.T<n&&S.made!=null){S.made=null;S.blk=0;S.fx=0}
if(S.play&&!S.stl){S.T+=dt*S.sp*.7;if(S.shoot===false&&S.T>=n){S.T=n;onIdle()}else if(S.T>=S.Tm){S.T=S.Tm;PP(false);S.gc-=14}$('sl').value=S.T/S.Tm*100}
const P=posAt(S.T),k0=Math.min(Math.floor(S.T),n-1),hi=holder(S.T),shp=S.shoot!==false&&S.T>=n&&S.T<n+.6,u=Math.min((S.T-n)/.6,1);
OV.forEach((o,j)=>{if(o.px==null){o.px=P[j][0];o.pz=P[j][1]}o.x+=((P[j][0]-o.px)/dt-o.x)*.3;o.z+=((P[j][1]-o.pz)/dt-o.z)*.3;o.px=P[j][0];o.pz=P[j][1];o.s=Math.hypot(o.x,o.z)});
if(S.shoot!==false&&S.T>=n&&S.made==null&&S.D&&!S.stl){const s=P[hi],dist=Math.hypot(s[0]-HX,s[1]),[r,zc]=AR(),th=dist>r||(Math.abs(s[1])>=zc+.05&&s[0]<4.4);let dm=9;S.D.forEach(o=>{dm=Math.min(dm,Math.hypot(o.x-s[0],o.z-s[1]))});
S.lp=cl((th?.36:dist<2.5?.62:.42)+cl((dm-1.3)*.1,-.2,.14)+radj(hi,th,dist,S.d),.05,.85);S.blk=S.iq>0&&Math.random()<cl((1-dm)*(.12+.2*S.iq),0,.5)?1:0;S.made=!S.blk&&Math.random()<S.lp;S.lpt=th?(S.n===3?2:3):(S.n===3?1:2)}
let b=ballAt(S.T);S.bx=b[0];const dm=dTargets(P,b,hi),ds=dt*(S.play?S.sp:1);
if(!S.D)S.D=dm.T.map((a,i)=>({x:a[0],z:a[1],vx:0,vz:0,fx:a[0],fz:a[1],tau:(.1+S.rnd[i]*.12)*q.t}));
if(S.T<n&&st[k0].ball!==st[k0+1].ball&&S.T-k0>=.45&&S.chk!==k0&&!S.stl){S.chk=k0;const a=P[st[k0].ball-1],c=P[st[k0+1].ball-1];let bd=9,bi=0;S.D.forEach((o,i)=>{if(o.x<0)return;const e=segD(o.x,o.z,a,c);if(e<bd){bd=e;bi=i}});
if(Math.random()<cl((.9-bd)*(.08+.14*S.iq),0,.5)){S.stl={d:bi,t0:S.clk,from:b.slice(),Tt:S.T};S.sc[1]++;PP(false);showRes('STEAL! 🛡');vsEnd(0,'ถูกขโมยบอล')}}
if(S.shoot===false&&S.T<n&&st[k0].ball===st[k0+1].ball&&S.T-k0>=.5&&S.chk2!==k0&&!S.stl){S.chk2=k0;const h=P[hi];let bd=9,bi=0;S.D.forEach((o,i)=>{if(o.x<0)return;const e=Math.hypot(o.x-h[0],o.z-h[1]);if(e<bd){bd=e;bi=i}});if(bd<.9&&Math.random()<(.9-bd)*.15*(S.iq+1)){S.stl={d:bi,t0:S.clk,from:b.slice(),Tt:S.T};S.sc[1]++;PP(false);showRes('STRIP! 🛡');vsEnd(0,'ถูกตบบอลหลุด')}}
S.D.forEach((o,i)=>{const T=dm.T[i],a=1-Math.exp(-ds/o.tau);o.fx+=(T[0]-o.fx)*a;o.fz+=(T[1]-o.fz)*a;const ex=o.fx-o.x,ez=o.fz-o.z,di=Math.hypot(ex,ez),s=Math.min((di>2.5?6.4:4.2)*q.v,di*6);let ax=(di>.02?ex/di*s:0)-o.vx,az=(di>.02?ez/di*s:0)-o.vz;const al=Math.hypot(ax,az),mx=16*q.v*ds;if(al>mx){ax*=mx/al;az*=mx/al}o.vx+=ax;o.vz+=az;o.x+=o.vx*ds;o.z+=o.vz*ds});
S.D.forEach((o,i)=>{if(o.x<-25)return;const sp=(x,z,m)=>{const e=Math.hypot(o.x-x,o.z-z);if(e<m&&e>.001){o.x+=(o.x-x)/e*(m-e)*.5;o.z+=(o.z-z)/e*(m-e)*.5}};S.D.forEach((r,j)=>{if(j!==i)sp(r.x,r.z,.6)});P.forEach(a=>sp(a[0],a[1],.5))});
if(S.stl){const o=S.D[S.stl.d],e=cl((S.clk-S.stl.t0)/.3,0,1);b=[S.stl.from[0]+(o.x-S.stl.from[0])*e,1.1,S.stl.from[2]+(o.z-S.stl.from[2])*e]}
const dph=Math.abs(Math.cos(S.clk*6.9)),f0=S.T-k0,pass=S.T<n&&st[k0].ball!==st[k0+1].ball&&f0>.12&&f0<.85;
OF.forEach((o,i)=>{o.visible=i<S.n;const ft=pass&&i===st[k0].ball-1?P[st[k0+1].ball-1]:null;anim(o,P[i][0],P[i][1],ft?ft[0]:b[0],ft?ft[1]:b[2],dt,{sh:shp&&i===hi,u,dr:i===hi&&!pass&&!shp&&OV[i].s>.8?dph:-1});o.userData.r.visible=i<S.n&&(i===hi||(S.tab==='pos'&&S.sel-1===i));o.userData.r.material.color.set(i===hi?0xffb703:0x3bc9db)});
DFN.forEach((d,i)=>{d.visible=i<S.n;anim(d,S.D[i].x,S.D[i].z,dm.F[i][0],dm.F[i][1],dt,{df:1,face:1,sh:shp&&i===dm.gi,u});d.userData.r.visible=false});
bg.position.set(b[0],b[1],b[2]);bg.rotation.x+=dt*5;arw.position.set(P[hi][0],2.75+Math.sin(t*.006)*.08,P[hi][1]);
if(S.made&&S.T>n+1)net.scale.y=1+.35*Math.sin((S.T-n-1)*30)*Math.max(0,1-(S.T-n-1)*4);else net.scale.y=1;
if(S.T>n+1&&!S.fx&&!S.stl){S.fx=1;if(S.made){S.sc[0]+=S.lpt;S.sh=1}else S.sc[1]++;vsEnd(S.made?S.lpt:0,S.blk?'ถูกบล็อก':S.made?'ทำแต้มได้':'ยิงพลาด');showRes(S.blk?'BLOCK! 🛡':S.made?`BUCKET! +${S.lpt}`:'MISS',2.6)}
if(S.rt>0)S.rt-=dt;else $('res').textContent='';
const SCL=S.n===3?12:24;$('s0').textContent=VS.on?VS.sc[0]:S.sc[0];$('s1').textContent=VS.on?VS.sc[1]:S.sc[1];$('gc').textContent=fmt(S.gc-S.T*4.5);$('shc').textContent=VS.on&&VS.rpg?'AP '+Math.max(0,VS.ap):Math.max(0,SCL-S.T*SCL/(n+.8)).toFixed(1);
if(S.heat){hacc+=dt;if(hacc>.25){hacc=0;heatU(P,hi)}}
S.sh=Math.max(0,S.sh-dt*2.5);
const ci=Math.min(Math.round(S.T),n);if(ci!==S.ci){S.ci=ci;$('note').textContent=`จังหวะ ${ci+1}/${n+1}: ${st[ci].note} · ${S.d.name}`;document.querySelectorAll('.st[data-i]').forEach(e=>e.classList.toggle('cur',+e.dataset.i===ci))}
camU(t);R.render(sc,cam)}
$('ht').onclick=()=>{S.heat=!S.heat;hm.visible=bm2.visible=S.heat;$('ht').classList.toggle('on',S.heat);if(!S.heat)$('bs').textContent=''};
$('md').onchange=e=>{vsStop();S.n=+e.target.value;DEFS=S.n===3?DEFS3:DEFS5;S.df='0';S.sel=1;court();fill();fresh()};

// ---------- ⚔ โหมดต่อสู้ เทิร์นเบส RPG (เลือกตัวละคร → เลือกคำสั่ง → ตัวละครขยับตามที่เลือก ฝั่งรับ AI ระดับ NBA)
const TEAM=['ทีม A','ทีม B'],plays=()=>DB.filter(p=>(p.n||5)===S.n),PN=id=>DB.find(p=>p.id===id),LS=()=>S.p.steps[S.p.steps.length-1];
const NBA_W=[['Man มาตรฐาน',5],['Switch ทุกสกรีน',3],['Drop Coverage',2],['Hedge & Recover',2],['Ice (ผลักเข้าข้าง)',2],['Pack Line',1.5],['Gap Help',1.5],['Tag/Rotate Help',1.5],['โซน 2-3',1],['Match-up Zone',.7],['Box-and-1',.3]];
const SPOTS=['T','WL','WR','SL','SR','UL','UR','EL','ER','ML','MR','AL','AR','HP','LL','LR','KL','KR'];
function autoDef(){if(S.n===3)return Math.random()*DEFS.length|0;const L=NBA_W.map(([nm,w])=>[DEFS.findIndex(d=>d.name===nm),w]).filter(x=>x[0]>=0);let r=Math.random()*L.reduce((a,x)=>a+x[1],0);for(const x of L){r-=x[1];if(r<=0)return x[0]}return L[0][0]}
function swapPlay(o,pos){const L=o.steps[o.steps.length-1],fin=L.ball-1;if(pos===fin||pos>=(o.n||5))return o;const sw=i=>i===fin?pos:i===pos?fin:i;
return Object.assign({},o,{steps:o.steps.map(s=>({ball:sw(s.ball-1)+1,pos:s.pos.map((_,i)=>s.pos[sw(i)]),note:s.note}))})}
function showVs(){S.tab='vs';document.querySelectorAll('[data-t]').forEach(x=>x.classList.toggle('on',x.dataset.t==='vs'))}
function bestOpt(){let bi=0,bs=-9;S.p.opts.forEach((o,i)=>{const e=shot(Object.assign({},S.p,{steps:S.p.steps.concat(o.steps)}),S.d,MID,S.lg).ep+Math.random()*.1;if(e>bs){bs=e;bi=i}});return bi}
function applyOpt(i){const o=S.p.opts[i];S.p.steps=S.p.steps.concat(o.steps.map(s=>Object.assign({},s)));S.optDone=true;S.shoot=true;S.idle=false;S.play=true;S.ci=-1;metrics();paths();if(S.tab!=='vs')tab();renderDc()}
function onIdle(){if(S.idle)return;S.idle=true;if(VS.on&&VS.rpg){VS.phase='cmd';renderDc();return}if(S.p.opts&&!S.optDone){if(VS.on&&VS.cpuO)applyOpt(bestOpt());else renderDc()}}
function addSteps(arr){arr.forEach(s=>S.p.steps.push(s));S.idle=false;S.shoot=false;S.chk2=-1;VS.ap--;VS.phase='anim';VS.act=null;metrics();PP(true);renderDc()}
const mk=(mods,ball,note)=>{const L=LS(),pos=L.pos.slice();for(const k in mods)pos[k]=mods[k];return{ball:ball==null?L.ball:ball,pos,note}};
const hpos=()=>LS().pos[LS().ball-1];
const ACT={move:(i,sp)=>addSteps([mk({[i]:SP[sp]},null,`${POS[i]} → ${SP[sp][2]}`)]),pass:(i,t)=>addSteps([mk({},t+1,`${POS[i]} ส่งบอลให้ ${POS[t]}`)]),
drive:(i,s)=>addSteps([mk({[i]:s<0?SP.DL:s>0?SP.DR:SP.R},null,`${POS[i]} ไดรฟ์เข้าหาแป้น`)]),cut:i=>{const p=LS().pos[i];addSteps([mk({[i]:p[1]<0?SP.DL:SP.DR},null,`${POS[i]} คัตเข้าแป้น`)])},
vcut:(i,sp)=>{const p=LS().pos[i];addSteps([mk({[i]:[p[0]+(HX-p[0])*.45,p[1]*.6]},null,`${POS[i]} V-cut ลงใน`),mk({[i]:SP[sp]},null,`${POS[i]} ออกไป ${SP[sp][2]}`)])},
screen:i=>{const h=hpos(),u=U2(h,[HX,0]);addSteps([mk({[i]:[h[0]+u[0]*1,h[1]+u[1]*1]},null,`${POS[i]} ตั้งสกรีนให้ ${POS[LS().ball-1]}`)])},
roll:i=>addSteps([mk({[i]:SP.R},null,`${POS[i]} โรลลงแป้น`)]),pop:i=>{const p=LS().pos[i];addSteps([mk({[i]:p[1]<0?SP.AL:SP.AR},null,`${POS[i]} ป๊อปออกยิง`)])},
shoot:()=>{S.shoot=true;S.idle=false;VS.phase='shot';renderDc()}};
function rpgInit(di){const F=S.n===3?['T','WL','WR','Z1','Z2']:['T','WL','WR','ER','HP'];S.p={id:'RPG',name:'RPG',kind:'โหมดต่อสู้',tags:[],n:S.n,steps:[{ball:1,pos:F.map(k=>SP[k]),note:'เริ่มบุก'}]};S.d=DEFS[di];S.T=0;S.made=null;S.D=null;S.fx=0;S.tr=1;S.chk=-1;S.chk2=-1;S.stl=null;S.blk=0;S.shoot=false;S.idle=false;S.optDone=true;S.ci=-1;S.rnd=S.rnd.map(()=>Math.random());S.ev={p:.4,pt:2,ep:1,sh:1,d:2,dist:5,th:false};OV.forEach(q=>q.px=null);
VS.ap=S.n===3?3:4;VS.sel=null;VS.act=null;VS.phase='anim';metrics();if(bl)bl.visible=false;$('dn').innerHTML=`🛡 <b>${S.d.name}</b> — ${S.d.note}`}
function vsPoss(){const di=autoDef();S.df=String(di);$('df').value=S.df;VS.rpg=!(VS.cpu&&VS.off===1);VS.cpuO=!VS.rpg;
if(VS.rpg){S.vsId=null;rpgInit(di);PP(true)}else{S.d=DEFS[di];const c=plays().map(p=>({id:p.id,s:evalP(p,S.d).ep+.15*p.tags.filter(t=>S.d.beats.includes(t)).length+Math.random()*.15})).sort((a,b)=>b.s-a.s);S.vsId=c[Math.random()*3|0].id;fresh();S.T=0;VS.phase='sim';PP(true)}renderDc();renderVs()}
function vsStart(){const t=Math.max(3,+$('vt').value||21);Object.assign(VS,{on:true,sc:[0,0],target:t,off:0,round:1,cpu:$('vc').value==='1',phase:'anim',msg:'',win:null});S.iq=2;['pl','df','md'].forEach(i=>$(i).disabled=true);$('l0').textContent='A';$('l1').textContent='B';showVs();vsPoss()}
function vsStop(){if(!VS.on)return;VS.on=false;S.vsId=null;VS.rpg=false;VS.cpuO=false;S.shoot=true;['pl','df','md'].forEach(i=>$(i).disabled=false);$('l0').textContent='OFF';$('l1').textContent='DEF';$('dc').innerHTML='';fresh()}
function vsEnd(pts,msg){if(!VS.on||!['sim','anim','shot'].includes(VS.phase))return;VS.sc[VS.off]+=pts;VS.msg=`${TEAM[VS.off]}: ${msg}${pts?' +'+pts:''}`;if(VS.sc[VS.off]>=VS.target){VS.phase='over';VS.win=VS.off}else VS.phase='res';renderDc();renderVs()}
function renderDc(){const el=$('dc');if(!el||!S.p)return;
if(VS.on&&(VS.phase==='res'||VS.phase==='over')){el.innerHTML=VS.phase==='over'?`<b style="font-size:17px">🏆 ${TEAM[VS.win]} ชนะ ${VS.sc[0]} - ${VS.sc[1]}</b><br><button id="dn2" class="on">เล่นใหม่</button>`:`<b>${VS.msg}</b> <span class="mut">(${VS.sc[0]} - ${VS.sc[1]})</span><br><button id="dn2" class="on">ต่อไป ▶</button>`;
$('dn2').onclick=()=>{if(VS.phase==='over'){vsStop();VS.on=false;renderVs();return}VS.off=1-VS.off;VS.round++;vsPoss()};return}
if(S.p.opts&&S.idle&&!S.optDone&&!(VS.on&&VS.cpuO)){el.innerHTML=`<b>🔀 เลือกทางเลือกต่อไป — ${S.p.name}</b><div class="col">`+S.p.opts.map((o,i)=>`<button data-o="${i}">${o.label} <span class="mut">EP ${shot(Object.assign({},S.p,{steps:S.p.steps.concat(o.steps)}),S.d,MID,S.lg).ep.toFixed(2)}</span></button>`).join('')+`<button data-o="-1">🤖 ให้ระบบเลือก</button></div>`;
el.querySelectorAll('[data-o]').forEach(b=>b.onclick=()=>{const i=+b.dataset.o;applyOpt(i<0?bestOpt():i)});return}
if(!VS.on||!VS.rpg){el.innerHTML='';return}
const L=LS(),hb=L.ball-1;let h;
if(VS.phase==='cmd'){h=`<b>${TEAM[VS.off]} บุก</b> · จังหวะคงเหลือ ${VS.ap} · 🛡 ${S.d.name}`;
if(VS.ap<=0)h+=`<p class="mut">หมดจังหวะ ต้องยิง!</p><button id="da-shoot" class="on">🎯 ยิง</button>`;
else{h+=`<div class="row">${POS.slice(0,S.n).map((n,i)=>`<button data-pl="${i}" class="${VS.sel===i?'on':''}">${n}${i===hb?' 🏀':''}</button>`).join('')}</div>`;
const i=VS.sel;if(i==null)h+=`<p class="mut">เลือกผู้เล่นที่จะสั่งการ</p>`;else{const hold=i===hb,P=L.pos,near=Math.hypot(P[i][0]-hpos()[0],P[i][1]-hpos()[1])<3;
const ab=hold?[['pass','ส่งบอล'],['drive','ไดรฟ์'],['move','เลี้ยงไปจุด'],['shoot','🎯 ยิง']]:[['move','ย้ายไปจุด'],['cut','คัตเข้าแป้น'],['vcut','V-cut'],['screen','ตั้งสกรีน'],...(near?[['roll','โรล'],['pop','ป๊อป']]:[])];
h+=`<div class="row">${ab.map(([k,t])=>`<button data-a="${k}" class="${VS.act===k?'on':''}">${t}</button>`).join('')}</div>`;
if(hold)h+=`<div class="mut">ถ้ายิงตอนนี้ ≈ EP ${epAt(P[i][0],P[i][1]).toFixed(2)}</div>`;
if(VS.act==='pass')h+=`<div class="row">${POS.slice(0,S.n).map((n,j)=>{if(j===hb)return'';let m=9;S.D&&S.D.forEach(o=>{if(o.x>0)m=Math.min(m,segD(o.x,o.z,P[hb],P[j]))});return`<button data-t="${j}">${m>1.4?'🟢':m>.9?'🟡':'🔴'} ${n}</button>`}).join('')}</div>`;
if(VS.act==='drive')h+=`<div class="row"><button data-d="-1">ซ้าย</button><button data-d="0">กลาง</button><button data-d="1">ขวา</button></div>`;
if(VS.act==='move'||VS.act==='vcut')h+=`<div class="row"><select id="dsp">${SPOTS.map(k=>`<option value="${k}">${SP[k][2]}</option>`).join('')}</select><button id="dgo" class="on">ไป</button></div>`}}}
else h=`<b>${TEAM[VS.off]} บุก</b> · <span class="mut">${VS.phase==='shot'?'🎯 ยิง…':'กำลังเคลื่อนที่…'}</span>`;
el.innerHTML=h;const q=s=>el.querySelectorAll(s);
q('[data-pl]').forEach(b=>b.onclick=()=>{VS.sel=+b.dataset.pl;VS.act=null;renderDc()});
q('[data-a]').forEach(b=>b.onclick=()=>{const a=b.dataset.a,i=VS.sel;if(a==='shoot')return ACT.shoot();if(['cut','screen','roll','pop'].includes(a))return ACT[a](i);VS.act=a;renderDc()});
q('[data-t]').forEach(b=>b.onclick=()=>ACT.pass(VS.sel,+b.dataset.t));q('[data-d]').forEach(b=>b.onclick=()=>ACT.drive(VS.sel,+b.dataset.d));
if($('dgo'))$('dgo').onclick=()=>ACT[VS.act](VS.sel,$('dsp').value);if($('da-shoot'))$('da-shoot').onclick=ACT.shoot}
function renderVs(){if(S.tab!=='vs')return;const el=$('tab');
if(!VS.on){el.innerHTML=`<p><b>⚔ โหมดต่อสู้ (เทิร์นเบส RPG)</b><br><span class="mut">ผลัดกันบุก ฝั่งบุกเห็นแผนรับของคู่ต่อสู้ เลือกตัวละครแล้วสั่งการ (ส่ง ไดรฟ์ คัต สกรีน ฯลฯ) ตัวละครจะขยับตามที่เลือก ฝั่งรับเป็น AI ระดับ NBA ทีมแรกถึงเป้าแต้มชนะ</span></p><div class="row"><label>เป้าแต้ม <input id="vt" type="number" value="21" min="3" max="99" style="width:60px"></label><select id="vc"><option value="1">เล่นกับ CPU (คุณคือทีม A)</option><option value="0">2 ผู้เล่น (ผลัดกันสั่งบนเครื่องเดียว)</option></select></div><button id="vgo" class="on">เริ่มเกม ⚔</button>`;$('vgo').onclick=vsStart;return}
el.innerHTML=`<div class="kpi"><div><b>${VS.sc[0]}</b>${TEAM[0]}</div><div><b>${VS.target}</b>เป้าแต้ม</div><div><b>${VS.sc[1]}</b>${TEAM[1]}</div></div><p class="mut">รอบที่ ${VS.round} · ${TEAM[VS.off]}บุก (แดง) / ${TEAM[1-VS.off]}รับ (น้ำเงิน) · สั่งการที่การ์ดด้านบนแผงนี้</p><div class="row"><button id="vq">ออกจากเกม</button></div>`;$('vq').onclick=()=>{vsStop();renderVs()}}

$('csv').value=CSV;court();setCam('p');rs();load();loadSheet();requestAnimationFrame(frame);

async function loadSheet(){const u=(window.HOOPS_CONFIG||{}).PLAYS_CSV;if(!u)return;
try{const r=await fetch(u,{cache:'no-store'});if(!r.ok)throw new Error(r.status);const t=await r.text(),d=parse(t);if(!d.length)throw new Error('empty');$('csv').value=t;load(d);$('bs').textContent='✅ โหลดแผนจาก Google Sheets แล้ว ('+d.length+' แผน)'}
catch(e){$('bs').textContent='⚠ ดึง Google Sheets ไม่ได้ ใช้ข้อมูลในเครื่องแทน'}}
