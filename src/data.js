export const projects = [
 {id:'P-2401',name:'Al Noor Residence',nameAr:'فيلا النور',location:'Saar, Bahrain',locationAr:'سار، البحرين',type:'Private residential villa',progress:68,status:'On track',start:'15 Jun 2026',completion:'28 Feb 2027',manager:'Omar Al Khalifa',client:'Ahmed Al Mahmood',area:'540 m²',budget:185000,paid:110000,image:'/villa.jpg'},
 {id:'P-2402',name:'Seef Business Centre',nameAr:'مركز السيف للأعمال',location:'Seef, Bahrain',locationAr:'السيف، البحرين',type:'Commercial development',progress:42,status:'Attention needed',start:'01 Jul 2026',completion:'30 Jun 2027',manager:'Omar Al Khalifa',client:'Seef Developments',area:'2,400 m²',budget:620000,paid:240000,image:'/site.jpg'},
 {id:'P-2403',name:'Riffa Garden Villa',nameAr:'فيلا حدائق الرفاع',location:'Riffa, Bahrain',locationAr:'الرفاع، البحرين',type:'Private residential villa',progress:91,status:'On track',start:'01 Mar 2026',completion:'15 Dec 2026',manager:'Sara Hassan',client:'Fatima Al Ali',area:'420 m²',budget:145000,paid:130000,image:'/villa.jpg'}
];
export const stages = [
 {id:1,weight:5,name:'Planning & approvals',ar:'التخطيط والموافقات',progress:100,date:'15 Jun – 10 Jul 2026',detail:'Drawings approved and building permits issued.',detailAr:'تم اعتماد المخططات وإصدار تصاريح البناء.'},
 {id:2,weight:20,name:'Foundation & groundwork',ar:'الأساسات والأعمال الأرضية',progress:100,date:'11 Jul – 20 Aug 2026',detail:'Excavation, foundation and waterproofing completed.',detailAr:'اكتملت أعمال الحفر والأساسات والعزل المائي.'},
 {id:3,weight:25,name:'Structure & concrete',ar:'الهيكل والخرسانة',progress:100,date:'21 Aug – 05 Oct 2026',detail:'Structural concrete and roof slab inspection approved.',detailAr:'تم اعتماد فحص الخرسانة الإنشائية وبلاطة السقف.'},
 {id:4,weight:25,name:'MEP & blockwork',ar:'الأعمال الكهروميكانيكية والبناء',progress:72,date:'06 Oct – 18 Nov 2026',detail:'First-fix electrical and plumbing installations in progress.',detailAr:'أعمال التمديدات الكهربائية والسباكة قيد التنفيذ.'},
 {id:5,weight:20,name:'Finishes & interiors',ar:'التشطيبات والتصميم الداخلي',progress:0,date:'19 Nov 2026 – 31 Jan 2027',detail:'Flooring, joinery, painting and interior finishes.',detailAr:'الأرضيات والنجارة والطلاء والتشطيبات الداخلية.'},
 {id:6,weight:5,name:'Inspection & handover',ar:'الفحص والتسليم',progress:0,date:'01 Feb – 28 Feb 2027',detail:'Final inspections, snagging and client handover.',detailAr:'الفحوصات النهائية ومعالجة الملاحظات والتسليم للعميل.'}
];
export const initialDocuments = [
 {id:1,project:'P-2401',name:'Ground floor — architectural plan',ar:'مخطط معماري — الطابق الأرضي',category:'Drawings',date:'27 Oct 2026',size:'2.4 MB',status:'Approved',by:'Omar Al Khalifa'},
 {id:2,project:'P-2401',name:'Progress payment — October 2026',ar:'دفعة الإنجاز — أكتوبر ٢٠٢٦',category:'Invoices',date:'26 Oct 2026',size:'184 KB',status:'Pending review',by:'Syskode Technologies Finance'},
 {id:3,project:'P-2401',name:'Building permit — approved copy',ar:'رخصة البناء — نسخة معتمدة',category:'Permits',date:'24 Oct 2026',size:'1.1 MB',status:'Approved',by:'Omar Al Khalifa'},
 {id:4,project:'P-2401',name:'Main construction agreement',ar:'عقد الإنشاء الرئيسي',category:'Contracts',date:'15 Jun 2026',size:'3.8 MB',status:'Signed',by:'Syskode Technologies Administration'},
 {id:5,project:'P-2401',name:'Steel reinforcement — delivery note',ar:'إشعار تسليم حديد التسليح',category:'Delivery notes',date:'22 Oct 2026',size:'620 KB',status:'Received',by:'Omar Al Khalifa'},
 {id:6,project:'P-2401',name:'September payment receipt',ar:'إيصال دفعة سبتمبر',category:'Payment records',date:'30 Sep 2026',size:'142 KB',status:'Paid',by:'Syskode Technologies Finance'},
 {id:7,project:'P-2402',name:'Commercial structure — revision B',ar:'مخطط الهيكل التجاري — المراجعة ب',category:'Drawings',date:'25 Oct 2026',size:'4.2 MB',status:'Pending review',by:'Omar Al Khalifa'},
 {id:8,project:'P-2403',name:'Handover inspection checklist',ar:'قائمة فحص التسليم',category:'Permits',date:'26 Oct 2026',size:'340 KB',status:'Approved',by:'Sara Hassan'}
];
export const initialUpdates = [
 {id:1,project:'P-2401',title:'First-floor MEP works progressing',ar:'تقدم الأعمال الكهروميكانيكية في الطابق الأول',body:'Electrical conduits and plumbing rough-in are now complete on the ground floor. The team has moved to the first floor, with inspection scheduled for 2 November.',bodyAr:'اكتملت تمديدات الكهرباء والسباكة في الطابق الأرضي. انتقل الفريق إلى الطابق الأول، مع تحديد موعد الفحص في ٢ نوفمبر.',date:'Today, 9:30 AM',author:'Omar Al Khalifa',tag:'Site update'},
 {id:2,project:'P-2401',title:'Architectural drawing approved',ar:'اعتماد المخطط المعماري',body:'The revised ground-floor architectural plan has been approved and is available in your documents.',bodyAr:'تم اعتماد المخطط المعماري المعدل للطابق الأرضي وهو متاح ضمن مستنداتك.',date:'Yesterday, 2:15 PM',author:'Omar Al Khalifa',tag:'Document'},
 {id:3,project:'P-2401',title:'October progress report published',ar:'نشر تقرير تقدم شهر أكتوبر',body:'Overall project completion has reached 68%. All structural milestones have been completed on schedule.',bodyAr:'وصلت نسبة الإنجاز الإجمالية للمشروع إلى ٦٨٪. اكتملت جميع مراحل الهيكل الإنشائي في الموعد المحدد.',date:'26 Oct, 11:00 AM',author:'Omar Al Khalifa',tag:'Milestone'}
];
export const initialUsers = [
 {id:1,name:'Ahmed Al Mahmood',email:'ahmed@example.com',role:'Client',project:'P-2401',status:'Active'},
 {id:2,name:'Omar Al Khalifa',email:'omar@example.com',role:'Project Manager',project:'P-2401, P-2402',status:'Active'},
 {id:3,name:'Sara Hassan',email:'sara@example.com',role:'Project Manager',project:'P-2403',status:'Active'},
 {id:4,name:'Syskode Technologies Administrator',email:'admin@example.com',role:'Administrator',project:'All projects',status:'Active'}
];
export const initialInvoices = [
 {id:'INV-2026-010',project:'P-2401',title:'MEP first-fix works',ar:'أعمال التمديدات الكهروميكانيكية',amount:18500,due:'05 Nov 2026',status:'Due'},
 {id:'INV-2026-009',project:'P-2401',title:'Structural completion payment',ar:'دفعة إكمال الهيكل الإنشائي',amount:25000,due:'30 Sep 2026',status:'Paid'},
 {id:'INV-2026-008',project:'P-2401',title:'Foundation & groundwork',ar:'الأساسات والأعمال الأرضية',amount:35000,due:'20 Aug 2026',status:'Paid'},
 {id:'INV-2026-007',project:'P-2401',title:'Project mobilisation',ar:'تجهيز الموقع وبدء المشروع',amount:50000,due:'15 Jun 2026',status:'Paid'}
];
