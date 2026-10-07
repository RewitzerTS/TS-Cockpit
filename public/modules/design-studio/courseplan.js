// Original course sheet, with independent editable text fields over its artwork.
const courseDays=['Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Sonntag'];
const courseRows=[
 [['10:00','RÜCKEN\nPOWER'],['18:00','LANGHANTEL-\nWORKOUT'],['',''],['','']],
 [['',''],['18:00','ZUMBA®'],['19:00','FULL BODY\nWORKOUT'],['19:45','ABS, LEGS\n& GLUTES']],
 [['10:00','ABS, LEGS\n& GLUTES'],['18:00','FUNCTIONAL\nWORKOUT\nam Tower'],['19:00','HIIT'],['','']],
 [['10:00','YOGA'],['18:00','ZUMBA®'],['19:00','HIIT'],['','']],
 [['10:00','RÜCKEN\nPOWER'],['18:00','PILATES'],['19:00','BREAK YOUR\nLIMITS'],['','']],
 [['10:00','YOGA']]
];
function courseText(text,left,top,width,fontSize,name,role,options={}){
 const o=configureTextbox(new fabric.Textbox(text,{left,top,width,fontSize,fontFamily:'GothamBlack',fill:'#231f20',lineHeight:1.08,name,layoutRole:'c:'+role,...options}));
 ensureTextFont(o);o.layoutBase=frameOf(o);canvas.add(o);return o;
}
async function courseplanTemplate(){
 busy=true;templateKind='courseplan';canvas.discardActiveObject();canvas.clear();canvas.backgroundColor='#fff';
 format='a5landscape';$('format').value=format;$('title').value='Kursplan Reutlingen';syncTemplateUI();
 await Promise.all(['GothamBlack','Montserrat-Black','Montserrat-Light'].map(f=>document.fonts.load('20px '+f)));
 const background=await imageFrom('assets/courseplan/background.png');
 background.set({left:0,top:0,scaleX:595.276/background.width,scaleY:419.528/background.height,name:'Kursplan · Originalgestaltung mit QR-Code',layoutRole:'c:background',fixedBackground:true,locked:true,selectable:false,evented:false,hasControls:false});
 background.layoutBase=frameOf(background);canvas.add(background);
 courseText('KURSPLAN',64.6,60.6,122,20.273,'Überschrift','heading',{fill:'#fff'});
 courseText('|',188.2,60.6,10,20.273,'Trennstrich','divider',{fill:'#fbb040'});
 courseText('REUTLINGEN',201.5,60.6,245,20.273,'Standort','location',{fill:'#fff'});
 courseText('STAND: 01.01.2025',64.6,83.4,240,8.785,'Stand-Datum','date',{fill:'#fff'});
 for(let day=0;day<courseDays.length;day++){
  const x=64.5+79.52*day;
  courseText(courseDays[day].toUpperCase(),x,141,74.5,7.04,courseDays[day]+' · Spaltenüberschrift','day:'+day,{fill:'#fff',textAlign:'center'});
  for(let row=0;row<courseRows[day].length;row++){
   const [time,title]=courseRows[day][row],y=[162.5,201.3,230,258.6][row];
   courseText(time,x,y+9.2,20,5.326,courseDays[day]+' '+(row+1)+' · Uhrzeit','time:'+day+':'+row,{fill:'#fff',textAlign:'center'});
   const lines=title.split('\n').length;
   courseText(title,x+24.8,y+(lines===3?4:lines===2?6:9.2),49,5.326,courseDays[day]+' '+(row+1)+' · Kurs','course:'+day+':'+row);
  }
 }
 courseText('Kurse finden ab 3 Teilnehmern statt. An Feiertagen finden keine Kurse statt.',64.5,315.9,385,5.92,'Teilnahmehinweis','note',{fontFamily:'Montserrat-Light'});
 courseText('Reutlingen | Föhrstr. 40a | Tel. 0 71 21 - 6 95 88 71',64.5,370,280,9.1,'Clubanschrift','address',{fontFamily:'Montserrat-Light',fill:'#fff'});
 courseText('WWW.TOPSPORTS.FITNESS',411.1,371,124,9.2,'Website','website',{fontFamily:'Courier New',fontWeight:'bold'});
 courseText('DOWNLOAD',468.2,212,89,13.2,'Download-Überschrift','download',{fill:'#fff'});
 busy=false;fit();record();properties();$('status').textContent='Kursplan · A5 Querformat · Texte per Doppelklick bearbeiten';
}
