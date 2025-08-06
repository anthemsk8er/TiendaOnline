

interface Province {
    provincia: string;
    distritos: string[];
}

interface Department {
    departamento: string;
    provincias: Province[];
}

export const peruLocations: Department[] = [
    {
        "departamento": "Amazonas",
        "provincias": [
            { "provincia": "Bagua", "distritos": ["Aramango", "Bagua", "Copallin", "El Parco", "Imaza", "La Peca"] },
            { "provincia": "Bongará", "distritos": ["Chisquilla", "Churuja", "Corosha", "Cuispes", "Florida", "Jazan", "Jumbilla", "Recta", "San Carlos", "Shipasbamba", "Valera", "Yambrasbamba"] },
            { "provincia": "Chachapoyas", "distritos": ["Asuncion", "Balsas", "Chachapoyas", "Cheto", "Chiliquin", "Chuquibamba", "Granada", "Huancas", "La Jalca", "Leimebamba", "Levanto", "Magdalena", "Mariscal Castilla", "Molinopampa", "Montevideo", "Olleros", "Quinjalca", "San Francisco de Daguas", "San Isidro de Maino", "Soloco", "Sonche"] },
            { "provincia": "Condorcanqui", "distritos": ["El Cenepa", "Nieva", "Rio Santiago"] },
            { "provincia": "Luya", "distritos": ["Camporredondo", "Cocabamba", "Colcamar", "Conila", "Inguilpata", "Lamud", "Longuita", "Lonya Chico", "Luya", "Luya Viejo", "Maria", "Ocalli", "Ocumal", "Pisuquia", "Providencia", "San Cristobal", "San Francisco del Yeso", "San Jeronimo", "San Juan de Lopecancha", "Santa Catalina", "Santo Tomas", "Tingo", "Trita"] },
            { "provincia": "Rodríguez de Mendoza", "distritos": ["Chirimoto", "Cochamal", "Huambo", "Limabamba", "Longar", "Mariscal Benavides", "Milpuc", "Omia", "San Nicolas", "Santa Rosa", "Totora", "Vista Alegre"] },
            { "provincia": "Utcubamba", "distritos": ["Bagua Grande", "Cajaruro", "Cumba", "El Milagro", "Jamalca", "Lonya Grande", "Yamon"] }
        ]
    },
    {
        "departamento": "Áncash",
        "provincias": [
            { "provincia": "Aija", "distritos": ["Aija", "Coris", "Huacllan", "La Merced", "Succha"] },
            { "provincia": "Antonio Raymondi", "distritos": ["Aczo", "Chaccho", "Chingas", "Llamellin", "Mirgas", "San Juan de Rontoy"] },
            { "provincia": "Asunción", "distritos": ["Acochaca", "Chacas"] },
            { "provincia": "Bolognesi", "distritos": ["Abelardo Pardo Lezameta", "Antonio Raymondi", "Aquia", "Cajacay", "Canis", "Chiquian", "Colquioc", "Huallanca", "Huasta", "Huayllacayan", "La Primavera", "Mangas", "Pacllon", "San Miguel de Corpanqui", "Ticllos"] },
            { "provincia": "Carhuaz", "distritos": ["Acopampa", "Amashca", "Anta", "Ataquero", "Carhuaz", "Marcara", "Pariahuanca", "San Miguel de Aco", "Shilla", "Tinco", "Yungar"] },
            { "provincia": "Carlos Fermín Fitzcarrald", "distritos": ["San Luis", "San Nicolas", "Yauya"] },
            { "provincia": "Casma", "distritos": ["Buena Vista Alta", "Casma", "Comandante Noel", "Yautan"] },
            { "provincia": "Corongo", "distritos": ["Aco", "Bambas", "Corongo", "Cusca", "La Pampa", "Yanac", "Yupan"] },
            { "provincia": "Huaraz", "distritos": ["Cochabamba", "Colcabamba", "Huanchay", "Huaraz", "Independencia", "Jangas", "La Libertad", "Olleros", "Pampas Grande", "Pariacoto", "Pira", "Tarica"] },
            { "provincia": "Huari", "distritos": ["Anra", "Cajay", "Chavin de Huantar", "Huacachi", "Huacchis", "Huachis", "Huantar", "Huari", "Masin", "Paucas", "Ponto", "Rahuapampa", "Rapayan", "San Marcos", "San Pedro de Chana", "Uco"] },
            { "provincia": "Huarmey", "distritos": ["Cochapeti", "Culebras", "Huarmey", "Huayan", "Malvas"] },
            { "provincia": "Huaylas", "distritos": ["Caraz", "Huallanca", "Huata", "Huaylas", "Mato", "Pamparomas", "Pueblo Libre", "Santa Cruz", "Santo Toribio", "Yuracmarca"] },
            { "provincia": "Mariscal Luzuriaga", "distritos": ["Casca", "Eleazar Guzman Barron", "Fidel Olivas Escudero", "Llama", "Llumpa", "Lucma", "Musga", "Piscobamba"] },
            { "provincia": "Ocros", "distritos": ["Acas", "Cajamarquilla", "Carhuapampa", "Cochas", "Congas", "Llipa", "Ocros", "San Cristobal de Rajan", "San Pedro", "Santiago de Chilcas"] },
            { "provincia": "Pallasca", "distritos": ["Bolognesi", "Cabana", "Conchucos", "Huacaschuque", "Huandoval", "Lacabamba", "Llapo", "Pallasca", "Pampas", "Santa Rosa", "Tauca"] },
            { "provincia": "Pomabamba", "distritos": ["Huayllan", "Parobamba", "Pomabamba", "Quinuabamba"] },
            { "provincia": "Recuay", "distritos": ["Catac", "Cotaparaco", "Huayllapampa", "Llacllin", "Marca", "Pampas Chico", "Pararin", "Recuay", "Tapacocha", "Ticapampa"] },
            { "provincia": "Santa", "distritos": ["Caceres del Peru", "Chimbote", "Coishco", "Macate", "Moro", "Nepeña", "Nuevo Chimbote", "Samanco", "Santa"] },
            { "provincia": "Sihuas", "distritos": ["Acobamba", "Alfonso Ugarte", "Cashapampa", "Chingalpo", "Huayllabamba", "Quiches", "Ragash", "San Juan", "Sicsibamba", "Sihuas"] },
            { "provincia": "Yungay", "distritos": ["Cascapara", "Mancos", "Matacoto", "Quillo", "Ranrahirca", "Shupluy", "Yanama", "Yungay"] }
        ]
    },
    {
        "departamento": "Apurímac",
        "provincias": [
            { "provincia": "Abancay", "distritos": ["Abancay", "Chacoche", "Circa", "Curahuasi", "Huanipaca", "Lambrama", "Pichirhua", "San Pedro de Cachora", "Tamburco"] },
            { "provincia": "Andahuaylas", "distritos": ["Andahuaylas", "Andarapa", "Chiara", "Huancarama", "Huancaray", "Huayana", "Jose Maria Arguedas", "Kaquiabamba", "Kishuara", "Pacobamba", "Pacucha", "Pampachiri", "Pomacocha", "San Antonio de Cachi", "San Jeronimo", "San Miguel de Chaccrampa", "Santa Maria de Chicmo", "Talavera", "Tumay Huaraca", "Turpo"] },
            { "provincia": "Antabamba", "distritos": ["Antabamba", "El Oro", "Huaquirca", "Juan Espinoza Medrano", "Oropesa", "Pachaconas", "Sabaino"] },
            { "provincia": "Aymaraes", "distritos": ["Capaya", "Caraybamba", "Chalhuanca", "Chapimarca", "Colcabamba", "Cotaruse", "Huayllo", "Justo Apu Sahuaraura", "Lucre", "Pocohuanca", "San Juan de Chacña", "Sañayca", "Soraya", "Tapairihua", "Tintay", "Toraya", "Yanaca"] },
            { "provincia": "Chincheros", "distritos": ["Anco_Huallo", "Chincheros", "Cocharcas", "Huaccana", "Ocobamba", "Ongoy", "Ranracancha", "Rocchacc", "Uranmarca"] },
            { "provincia": "Cotabambas", "distritos": ["Challhuahuacho", "Cotabambas", "Coyllurqui", "Haquira", "Mara", "Tambobamba"] },
            { "provincia": "Grau", "distritos": ["Chuquibambilla", "Curpahuasi", "Gamarra", "Huayllati", "Mamara", "Micaela Bastidas", "Pataypampa", "Progreso", "San Antonio", "Santa Rosa", "Turpay", "Vilcabamba", "Virundo"] }
        ]
    },
    {
        "departamento": "Arequipa",
        "provincias": [
            { "provincia": "Arequipa", "distritos": ["Alto Selva Alegre", "Arequipa", "Cayma", "Cerro Colorado", "Characato", "Chiguata", "Jacobo Hunter", "Jose Luis Bustamante Y Rivero", "La Joya", "Mariano Melgar", "Miraflores", "Mollebaya", "Paucarpata", "Pocsi", "Polobaya", "Quequeña", "Sabandia", "Sachaca", "San Juan de Siguas", "San Juan de Tarucani", "Santa Isabel de Siguas", "Santa Rita de Siguas", "Socabaya", "Tiabaya", "Uchumayo", "Vitor", "Yanahuara", "Yarabamba", "Yura"] },
            { "provincia": "Camaná", "distritos": ["Camana", "Jose Maria Quimper", "Mariano Nicolas Valcarcel", "Mariscal Caceres", "Nicolas de Pierola", "Ocoña", "Quilca", "Samuel Pastor"] },
            { "provincia": "Caravelí", "distritos": ["Acari", "Atico", "Atiquipa", "Bella Union", "Cahuacho", "Caraveli", "Chala", "Chaparra", "Huanuhuanu", "Jaqui", "Lomas", "Quicacha", "Yauca"] },
            { "provincia": "Castilla", "distritos": ["Andagua", "Aplao", "Ayo", "Chachas", "Chilcaymarca", "Choco", "Huancarqui", "Machaguay", "Orcopampa", "Pampacolca", "Tipan", "Uñon", "Uraca", "Viraco"] },
            { "provincia": "Caylloma", "distritos": ["Achoma", "Cabanaconde", "Callalli", "Caylloma", "Chivay", "Coporaque", "Huambo", "Huanca", "Ichupampa", "Lari", "Lluta", "Maca", "Madrigal", "Majes", "San Antonio de Chuca", "Sibayo", "Tapay", "Tisco", "Tuti", "Yanque"] },
            { "provincia": "Condesuyos", "distritos": ["Andaray", "Cayarani", "Chichas", "Chuquibamba", "Iray", "Rio Grande", "Salamanca", "Yanaquihua"] },
            { "provincia": "Islay", "distritos": ["Cocachacra", "Dean Valdivia", "Islay", "Mejia", "Mollendo", "Punta de Bombon"] },
            { "provincia": "La Uniòn", "distritos": ["Alca", "Charcana", "Cotahuasi", "Huaynacotas", "Pampamarca", "Puyca", "Quechualla", "Sayla", "Tauria", "Tomepampa", "Toro"] }
        ]
    },
    {
        "departamento": "Ayacucho",
        "provincias": [
            { "provincia": "Cangallo", "distritos": ["Cangallo", "Chuschi", "Los Morochucos", "Maria Parado de Bellido", "Paras", "Totos"] },
            { "provincia": "Huamanga", "distritos": ["Acocro", "Acos Vinchos", "Andres Avelino Caceres Dorregaray", "Ayacucho", "Carmen Alto", "Chiara", "Jesus Nazareno", "Ocros", "Pacaycasa", "Quinua", "San Jose de Ticllas", "San Juan Bautista", "Santiago de Pischa", "Socos", "Tambillo", "Vinchos"] },
            { "provincia": "Huanca Sancos", "distritos": ["Carapo", "Sacsamarca", "Sancos", "Santiago de Lucanamarca"] },
            { "provincia": "Huanta", "distritos": ["Ayahuanco", "Huamanguilla", "Huanta", "Iguain", "Llochegua", "Luricocha", "Pucacolpa", "Santillana", "Sivia", "Uchuraccay"] },
            { "provincia": "La Mar", "distritos": ["Anco", "Ayna", "Chilcas", "Chungui", "Luis Carranza", "Oronccoy", "Samugari", "San Miguel", "Santa Rosa", "Tambo", "Union Progreso"] },
            { "provincia": "Lucanas", "distritos": ["Aucara", "Cabana", "Carmen Salcedo", "Chaviña", "Chipao", "Huac-Huas", "Laramate", "Leoncio Prado", "Llauta", "Lucanas", "Ocaña", "Otoca", "Puquio", "Saisa", "San Cristobal", "San Juan", "San Pedro", "San Pedro de Palco", "Sancos", "Santa Ana de Huaycahuacho", "Santa Lucia"] },
            { "provincia": "Parinacochas", "distritos": ["Chumpi", "Coracora", "Coronel Castañeda", "Pacapausa", "Pullo", "Puyusca", "San Francisco de Ravacayco", "Upahuacho"] },
            { "provincia": "Pàucar del Sara Sara", "distritos": ["Colta", "Corculla", "Lampa", "Marcabamba", "Oyolo", "Pararca", "Pausa", "San Javier de Alpabamba", "San Jose de Ushua", "Sara Sara"] },
            { "provincia": "Sucre", "distritos": ["Belen", "Chalcos", "Chilcayoc", "Huacaña", "Morcolla", "Paico", "Querobamba", "San Pedro de Larcay", "San Salvador de Quije", "Santiago de Paucaray", "Soras"] },
            { "provincia": "Víctor Fajardo", "distritos": ["Alcamenca", "Apongo", "Asquipata", "Canaria", "Cayara", "Colca", "Huamanquiquia", "Huancapi", "Huancaraylla", "Huaya", "Sarhua", "Vilcanchos"] },
            { "provincia": "Vilcas Huamán", "distritos": ["Accomarca", "Carhuanca", "Concepcion", "Huambalpa", "Independencia", "Saurama", "Vilcas Huaman", "Vischongo"] }
        ]
    },
    {
        "departamento": "Cajamarca",
        "provincias": [
            { "provincia": "Cajabamba", "distritos": ["Cachachi", "Cajabamba", "Condebamba", "Sitacocha"] },
            { "provincia": "Cajamarca", "distritos": ["Asuncion", "Cajamarca", "Chetilla", "Cospan", "Encañada", "Jesus", "Llacanora", "Los Baños del Inca", "Magdalena", "Matara", "Namora", "San Juan"] },
            { "provincia": "Celendín", "distritos": ["Celendin", "Chumuch", "Cortegana", "Huasmin", "Jorge Chavez", "Jose Galvez", "Miguel Iglesias", "Oxamarca", "Sorochuco", "Sucre", "Utco", "La Libertad de Pallan"] },
            { "provincia": "Chota", "distritos": ["Anguia", "Chadin", "Chiguirip", "Chimbán", "Choropampa", "Chota", "Cochabamba", "Conchan", "Huambos", "Lajas", "Llama", "Miracosta", "Paccha", "Pion", "Puentecillo", "Querocoto", "San Juan de Licupis", "Tacabamba", "Tocmoche"] },
            { "provincia": "Contumazá", "distritos": ["Chilete", "Contumaza", "Cupisnique", "Guzmango", "San Benito", "Santa Cruz de Toled", "Tantarica", "Yonan"] },
            { "provincia": "Cutervo", "distritos": ["Callayuc", "Choros", "Cujillo", "Cutervo", "La Ramada", "Pimpingos", "Querocotillo", "San Andres de Cutervo", "San Juan de Cutervo", "San Luis de Lucma", "Santa Cruz", "Santo Domingo de la Capilla", "Santo Tomas", "Socota", "Toribio Casanova"] },
            { "provincia": "Hualgayoc", "distritos": ["Bambamarca", "Chugur", "Hualgayoc"] },
            { "provincia": "Jaén", "distritos": ["Bellavista", "Chontali", "Colasay", "Huabal", "Jaen", "Las Pirias", "Pomahuaca", "Pucara", "Sallique", "San Felipe", "San Jose del Alto", "Santa Rosa"] },
            { "provincia": "San Ignacio", "distritos": ["Chirinos", "Huarango", "La Coipa", "Namballe", "San Ignacio", "San Jose de Lourdes", "Tabaconas"] },
            { "provincia": "San Marcos", "distritos": ["Chancay", "Eduardo Villanueva", "Gregorio Pita", "Ichocan", "Jose Manuel Quiroz", "Jose Sabogal", "Pedro Galvez"] },
            { "provincia": "San Miguel", "distritos": ["Bolivar", "Calquis", "Catilluc", "El Prado", "La Florida", "Llapa", "Nanchoc", "Niepos", "San Gregorio", "San Miguel", "San Silvestre de Cochan", "Tongod", "Union Agua Blanca"] },
            { "provincia": "San Pablo", "distritos": ["San Bernardino", "San Luis", "San Pablo", "Tumbaden"] },
            { "provincia": "Santa Cruz", "distritos": ["Andabamba", "Catache", "Chancaybaños", "La Esperanza", "Ninabamba", "Pulan", "Santa Cruz", "Saucepampa", "Sexi", "Uticyacu", "Yauyucan"] }
        ]
    },
    {
        "departamento": "Callao",
        "provincias": [
            { "provincia": "Callao", "distritos": ["Bellavista", "Callao", "Carmen de La Legua-Reynoso", "La Perla", "La Punta", "Ventanilla", "Mi Perú"] }
        ]
    },
    {
        "departamento": "Cusco",
        "provincias": [
            { "provincia": "Acomayo", "distritos": ["Acomayo", "Acopia", "Acos", "Mosoc Llacta", "Pomacanchi", "Rondocan", "Sangarara"] },
            { "provincia": "Anta", "distritos": ["Ancahuasi", "Anta", "Cachimayo", "Chinchaypujio", "Huarocondo", "Limatambo", "Mollepata", "Pucyura", "Zurite"] },
            { "provincia": "Calca", "distritos": ["Calca", "Coya", "Lamay", "Lares", "Pisac", "San Salvador", "Taray", "Yanatile"] },
            { "provincia": "Canas", "distritos": ["Checca", "Kunturkanki", "Langui", "Layo", "Pampamarca", "Quehue", "Tupac Amaru", "Yanaoca"] },
            { "provincia": "Canchis", "distritos": ["Checacupe", "Combapata", "Marangani", "Pitumarca", "San Pablo", "San Pedro", "Sicuani", "Tinta"] },
            { "provincia": "Chumbivilcas", "distritos": ["Ccapacmarca", "Chamaca", "Colquemarca", "Livitaca", "Llusco", "Quiñota", "Santo Tomas", "Velille"] },
            { "provincia": "Cusco", "distritos": ["Ccorca", "Cusco", "Poroy", "San Jeronimo", "San Sebastian", "Santiago", "Saylla", "Wanchaq"] },
            { "provincia": "Espinar", "distritos": ["Alto Pichigua", "Condoroma", "Coporaque", "Espinar", "Ocoruro", "Pallpata", "Pichigua", "Suyckutambo"] },
            { "provincia": "La Convención", "distritos": ["Echarate", "Huayopata", "Inkawasi", "Kimbiri", "Maranura", "Megantoni", "Ocobamba", "Pichari", "Quebrada Honda", "Quellouno", "Santa Ana", "Santa Teresa", "Vilcabamba", "Villa Kintiarina", "Villa Virgen"] },
            { "provincia": "Paruro", "distritos": ["Accha", "Ccapi", "Colcha", "Huanoquite", "Omacha", "Paccaritambo", "Paruro", "Pillpinto", "Yaurisque"] },
            { "provincia": "Paucartambo", "distritos": ["Caicay", "Challabamba", "Colquepata", "Huancarani", "Kosñipata", "Paucartambo"] },
            { "provincia": "Quispicanchi", "distritos": ["Andahuaylillas", "Camanti", "Ccarhuayo", "Ccatca", "Cusipata", "Huaro", "Lucre", "Marcapata", "Ocongate", "Oropesa", "Quiquijana", "Urcos"] },
            { "provincia": "Urubamba", "distritos": ["Chinchero", "Huayllabamba", "Machupicchu", "Maras", "Ollantaytambo", "Urubamba", "Yucay"] }
        ]
    },
    {
        "departamento": "Huancavelica",
        "provincias": [
            { "provincia": "Acobamba", "distritos": ["Acobamba", "Andabamba", "Anta", "Caja", "Marcas", "Paucara", "Pomacocha", "Rosario"] },
            { "provincia": "Angaraes", "distritos": ["Anchonga", "Callanmarca", "Ccochaccasa", "Chincho", "Congalla", "Huanca-Huanca", "Huayllay Grande", "Julcamarca", "Lircay", "San Antonio de Antaparco", "Santo Tomas de Pata", "Secclla"] },
            { "provincia": "Castrovirreyna", "distritos": ["Arma", "Aurahua", "Capillas", "Castrovirreyna", "Chupamarca", "Cocas", "Huachos", "Huamatambo", "Mollepampa", "San Juan", "Santa Ana", "Tantara", "Ticrapo"] },
            { "provincia": "Churcampa", "distritos": ["Anco", "Chinchihuasi", "Churcampa", "Cosme", "El Carmen", "La Merced", "Locroja", "Pachamarca", "Paucarbamba", "San Miguel de Mayocc", "San Pedro de Coris"] },
            { "provincia": "Huancavelica", "distritos": ["Acobambilla", "Acoria", "Ascension", "Conayca", "Cuenca", "Huachocolpa", "Huancavelica", "Huando", "Huayllahuara", "Izcuchaca", "Laria", "Manta", "Mariscal Caceres", "Moya", "Nuevo Occoro", "Palca", "Pilchaca", "Vilca", "Yauli"] },
            { "provincia": "Huaytará", "distritos": ["Ayavi", "Cordova", "Huayacundo Arma", "Huaytara", "Laramarca", "Ocoyo", "Pilpichaca", "Querco", "Quito-Arma", "San Antonio de Cusicancha", "San Francisco de Sangayaico", "San Isidro", "Santiago de Chocorvos", "Santiago de Quirahuara", "Santo Domingo de Capillas", "Tambo"] },
            { "provincia": "Tayacaja", "distritos": ["Acostambo", "Acraquia", "Ahuaycha", "Andaymarca", "Colcabamba", "Daniel Hernandez", "Huachocolpa", "Huaribamba", "Ñahuimpuquio", "Pampas", "Pazos", "Pichos", "Quichuas", "Quishuar", "Roble", "Salcabamba", "Salcahuasi", "San Marcos de Rocchac", "Santiago de Tucuma", "Surcubamba", "Tintay Puncu"] }
        ]
    },
    {
        "departamento": "Huánuco",
        "provincias": [
            { "provincia": "Ambo", "distritos": ["Ambo", "Cayna", "Colpas", "Conchamarca", "Huacar", "San Francisco", "San Rafael", "Tomay Kichwa"] },
            { "provincia": "Dos de Mayo", "distritos": ["Chuquis", "La Union", "Marias", "Pachas", "Quivilla", "Ripan", "Shunqui", "Sillapata", "Yanas"] },
            { "provincia": "Huacaybamba", "distritos": ["Canchabamba", "Cochabamba", "Huacaybamba", "Pinra"] },
            { "provincia": "Huamalíes", "distritos": ["Arancay", "Chavin de Pariarca", "Jacas Grande", "Jircan", "Llata", "Miraflores", "Monzon", "Puños", "Singa", "Tantamayo", "Punchao"] },
            { "provincia": "Huánuco", "distritos": ["Amarilis", "Chinchao", "Churubamba", "Huanuco", "Margos", "Pillco Marca", "Quisqui", "San Francisco de Cayran", "San Pablo de Pillao", "San Pedro de Chaulan", "Santa Maria del Valle", "Yarumayo", "Yacus"] },
            { "provincia": "Lauricocha", "distritos": ["Baños", "Jesus", "Jivia", "Queropalca", "Rondos", "San Francisco de Asis", "San Miguel de Cauri"] },
            { "provincia": "Leoncio Prado", "distritos": ["Castillo Grande", "Daniel Alomias Robles", "Hermilio Valdizan", "Jose Crespo y Castillo", "Luyando", "Mariano Damaso Beraun", "Pucayacu", "Pueblo Nuevo", "Rupa-Rupa", "Santo Domingo de Anda"] },
            { "provincia": "Marañón", "distritos": ["Cholón", "Huacrachuco", "La Morada", "San Buenaventura", "Santa Rosa de Alto Yanajanca"] },
            { "provincia": "Pachitea", "distritos": ["Chaglla", "Molino", "Panao", "Umari"] },
            { "provincia": "Puerto Inca", "distritos": ["Codo del Pozuzo", "Honoria", "Puerto Inca", "Tournavista", "Yuyapichis"] },
            { "provincia": "Yarowilca", "distritos": ["Aparicio Pomares", "Cahuac", "Chacabamba", "Chavinillo", "Choras", "Jacas Chico", "Obas", "Pampamarca"] }
        ]
    },
    {
        "departamento": "Ica",
        "provincias": [
            { "provincia": "Chincha", "distritos": ["Alto Laran", "Chavin", "Chincha Alta", "Chincha Baja", "El Carmen", "Grocio Prado", "Pueblo Nuevo", "San Juan de Yanac", "San Pedro de Huacarpana", "Sunampe", "Tambo de Mora"] },
            { "provincia": "Ica", "distritos": ["Ica", "La Tinguiña", "Los Aquijes", "Ocucaje", "Pachacutec", "Parcona", "Pueblo Nuevo", "Salas", "San Jose de Los Molinos", "San Juan Bautista", "Santiago", "Subtanjalla", "Tate", "Yauca del Rosario"] },
            { "provincia": "Nazca", "distritos": ["Changuillo", "El Ingenio", "Marcona", "Nazca", "Vista Alegre"] },
            { "provincia": "Palpa", "distritos": ["Llipata", "Palpa", "Rio Grande", "Santa Cruz", "Tibillo"] },
            { "provincia": "Pisco", "distritos": ["Huancano", "Humay", "Independencia", "Paracas", "Pisco", "San Andres", "San Clemente", "Tupac Amaru Inca"] }
        ]
    },
    {
        "departamento": "Junín",
        "provincias": [
            { "provincia": "Chanchamayo", "distritos": ["Chanchamayo", "Perene", "Pichanaqui", "San Luis de Shuaro", "San Ramon", "Vitoc"] },
            { "provincia": "Chupaca", "distritos": ["Ahuac", "Chongos Bajo", "Chupaca", "Huachac", "Huamancaca Chico", "San Juan de Iscos", "San Juan de Jarpa", "Tres de Diciembre", "Yanacancha"] },
            { "provincia": "Concepción", "distritos": ["Aco", "Andamarca", "Chambara", "Cochas", "Comas", "Concepcion", "Heroinas Toledo", "Manzanares", "Mariscal Castilla", "Matahuasi", "Mito", "Nueve de Julio", "Orcotuna", "San Jose de Quero", "Santa Rosa de Ocopa"] },
            { "provincia": "Huancayo", "distritos": ["Carhuacallanga", "Chacapampa", "Chicche", "Chilca", "Chongos Alto", "Chupuro", "Colca", "Cullhuas", "El Tambo", "Huacrapuquio", "Hualhuas", "Huancan", "Huancayo", "Huasicancha", "Huayucachi", "Ingenio", "Pariahuanca", "Pilcomayo", "Pucara", "Quichuay", "Quilcas", "San Agustin", "San Jeronimo de Tunan", "San Pedro de Saño", "Santo Domingo de Acobamba", "Sapallanga", "Sicaya", "Viques"] },
            { "provincia": "Jauja", "distritos": ["Acolla", "Apata", "Ataura", "Canchayllo", "Curicaca", "El Mantaro", "Huamali", "Huaripampa", "Huertas", "Janjaillo", "Jauja", "Julcan", "Leonor Ordoñez", "Llocllapampa", "Marco", "Masma", "Masma Chicche", "Molinos", "Monobamba", "Muqui", "Muquiyauyo", "Paca", "Paccha", "Pancan", "Parco", "Pomacancha", "Ricran", "San Lorenzo", "San Pedro de Chunan", "Sausa", "Sincos", "Tunan Marca", "Yauli", "Yauyos"] },
            { "provincia": "Junín", "distritos": ["Carhuamayo", "Junin", "Ondores", "Ulcumayo"] },
            { "provincia": "Satipo", "distritos": ["Coviriali", "Llaylla", "Mazamari", "Pampa Hermosa", "Pangoa", "Rio Negro", "Rio Tambo", "Satipo", "Vizcatan del Ene"] },
            { "provincia": "Tarma", "distritos": ["Acobamba", "Huaricolca", "Huasahuasi", "La Union", "Palca", "Palcamayo", "San Pedro de Cajas", "Tapo", "Tarma"] },
            { "provincia": "Yauli", "distritos": ["Chacapalpa", "Huay-Huay", "La Oroya", "Marcapomacocha", "Morococha", "Paccha", "Santa Barbara de Carhuacayan", "Santa Rosa de Sacco", "Suitucancha", "Yauli"] }
        ]
    },
    {
        "departamento": "La Libertad",
        "provincias": [
            { "provincia": "Ascope", "distritos": ["Ascope", "Casa Grande", "Chicama", "Chocope", "Magdalena de Cao", "Paijan", "Razuri", "Santiago de Cao"] },
            { "provincia": "Bolívar", "distritos": ["Bambamarca", "Bolivar", "Condormarca", "Longotea", "Uchumarca", "Ucuncha"] },
            { "provincia": "Chepén", "distritos": ["Chepen", "Pacanga", "Pueblo Nuevo"] },
            { "provincia": "Gran Chimú", "distritos": ["Cascas", "Lucma", "Marmot", "Sayapullo"] },
            { "provincia": "Julcán", "distritos": ["Calamarca", "Carabamba", "Huaso", "Julcan"] },
            { "provincia": "Otuzco", "distritos": ["Agallpampa", "Charat", "Huaranchal", "La Cuesta", "Mache", "Otuzco", "Paranday", "Salpo", "Sinsicap", "Usquil"] },
            { "provincia": "Pacasmayo", "distritos": ["Guadalupe", "Jequetepeque", "Pacasmayo", "San Jose", "San Pedro de Lloc"] },
            { "provincia": "Pataz", "distritos": ["Buldibuyo", "Chilia", "Huancaspata", "Huaylillas", "Huayo", "Ongon", "Parcoy", "Pataz", "Pias", "Santiago de Challas", "Taurija", "Tayabamba", "Urpay"] },
            { "provincia": "Sánchez Carrión", "distritos": ["Cochorco", "Curgos", "Chugay", "Huamachuco", "Marcabal", "Sanagoran", "Sarin", "Sartimbamba"] },
            { "provincia": "Santiago de Chuco", "distritos": ["Angasmarca", "Cachicadan", "Mollebamba", "Mollepata", "Quiruvilca", "Santa Cruz de Chuca", "Santiago de Chuco", "Sitabamba"] },
            { "provincia": "Trujillo", "distritos": ["El Porvenir", "Florencia de Mora", "Huanchaco", "La Esperanza", "Laredo", "Moche", "Poroto", "Salaverry", "Simbal", "Trujillo", "Victor Larco Herrera"] },
            { "provincia": "Virú", "distritos": ["Chao", "Guadalupito", "Viru"] }
        ]
    },
    {
        "departamento": "Lambayeque",
        "provincias": [
            { "provincia": "Chiclayo", "distritos": ["Cayalti", "Chiclayo", "Chongoyape", "Eten", "Eten Puerto", "Jose Leonardo Ortiz", "La Victoria", "Lagunas", "Monsefu", "Nueva Arica", "Oyotun", "Picsi", "Pimentel", "Pomalca", "Pucala", "Reque", "Santa Rosa", "Saña", "Tumán"] },
            { "provincia": "Ferreñafe", "distritos": ["Cañaris", "Ferreñafe", "Incahuasi", "Manuel Antonio Mesones Muro", "Pitipo", "Pueblo Nuevo"] },
            { "provincia": "Lambayeque", "distritos": ["Chochope", "Illimo", "Jayanca", "Lambayeque", "Mochumi", "Morrope", "Motupe", "Olmos", "Pacora", "Salas", "San Jose", "Tucume"] }
        ]
    },
    {
        "departamento": "Lima",
        "provincias": [
            { "provincia": "Barranca", "distritos": ["Barranca", "Paramonga", "Pativilca", "Supe", "Supe Puerto"] },
            { "provincia": "Cajatambo", "distritos": ["Cajatambo", "Copa", "Gorgor", "Huancapon", "Manas"] },
            { "provincia": "Canta", "distritos": ["Arahuay", "Canta", "Huamantanga", "Huaros", "Lachaqui", "San Buenaventura", "Santa Rosa de Quives"] },
            { "provincia": "Cañete", "distritos": ["Asia", "Calango", "Cerro Azul", "Chilca", "Coayllo", "Imperial", "Lunahuana", "Mala", "Nuevo Imperial", "Pacaran", "Quilmana", "San Antonio", "San Luis", "San Vicente de Cañete", "Santa Cruz de Flores", "Zúñiga"] },
            { "provincia": "Huaral", "distritos": ["Atavillos Alto", "Atavillos Bajo", "Aucallama", "Chancay", "Huaral", "Ihuari", "Lampian", "Pacaraos", "San Miguel de Acos", "Santa Cruz de Andamarca", "Sumbilca", "Veintisiete de Noviembre"] },
            { "provincia": "Huarochirí", "distritos": ["Antioquia", "Callahuanca", "Carampoma", "Chicla", "Cuenca", "Huanza", "Huarochiri", "Lahuaytambo", "Langa", "Laraos", "Mariatana", "Matucana", "Ricardo Palma", "San Andres de Tupicocha", "San Antonio", "San Bartolome", "San Damian", "San Juan de Iris", "San Juan de Tantaranche", "San Lorenzo de Quinti", "San Mateo", "San Mateo de Otao", "San Pedro de Casta", "San Pedro de Huancayre", "Sangallaya", "Santa Cruz de Cocachacra", "Santa Eulalia", "Santiago de Anchucaya", "Santiago de Tuna", "Santo Domingo de Los Olleros", "San Jerónimo de Surco", "Songos"] },
            { "provincia": "Huaura", "distritos": ["Ambar", "Caleta de Carquin", "Checras", "Huacho", "Hualmay", "Huaura", "Leoncio Prado", "Paccho", "Santa Leonor", "Santa Maria", "Sayan", "Vegueta"] },
            { "provincia": "Lima", "distritos": ["Ancon", "Ate", "Barranco", "Breña", "Carabayllo", "Chaclacayo", "Chorrillos", "Cieneguilla", "Comas", "El Agustino", "Independencia", "Jesus Maria", "La Molina", "La Victoria", "Lince", "Los Olivos", "Lurigancho", "Lurin", "Magdalena del Mar", "Pueblo Libre", "Miraflores", "Pachacamac", "Pucusana", "Puente Piedra", "Punta Hermosa", "Punta Negra", "Rimac", "San Bartolo", "San Borja", "San Isidro", "San Juan de Lurigancho", "San Juan de Miraflores", "San Luis", "San Martin de Porres", "San Miguel", "Santa Anita", "Santa Maria del Mar", "Santa Rosa", "Santiago de Surco", "Surquillo", "Villa El Salvador", "Villa Maria del Triunfo"] },
            { "provincia": "Oyón", "distritos": ["Andajes", "Caujul", "Cochamarca", "Navan", "Oyon", "Pachangara"] },
            { "provincia": "Yauyos", "distritos": ["Alis", "Ayauca", "Ayaviri", "Azangaro", "Cacra", "Carania", "Catahuasi", "Chocos", "Cochas", "Colonia", "Hongos", "Huampara", "Huancaya", "Huangascar", "Huantan", "Huañec", "Laraos", "Lincha", "Madean", "Miraflores", "Omas", "Putinza", "Quinches", "Quinocay", "San Joaquin", "San Pedro de Pilas", "Tanta", "Tauripampa", "Tomas", "Tupe", "Viñac", "Vitis", "Yauyos"] }
        ]
    },
    {
        "departamento": "Loreto",
        "provincias": [
            { "provincia": "Alto Amazonas", "distritos": ["Balsapuerto", "Jeberos", "Lagunas", "Santa Cruz", "Teniente Cesar Lopez Rojas", "Yurimaguas"] },
            { "provincia": "Datem del Marañón", "distritos": ["Andoas", "Barranca", "Cahuapanas", "Manseriche", "Morona", "Pastaza"] },
            { "provincia": "Loreto", "distritos": ["Nauta", "Parinari", "Tigre", "Trompeteros", "Urarinas"] },
            { "provincia": "Mariscal Ramón Castilla", "distritos": ["Pebas", "Ramon Castilla", "San Pablo", "Yavari"] },
            { "provincia": "Maynas", "distritos": ["Alto Nanay", "Belén", "Fernando Lores", "Indiana", "Iquitos", "Las Amazonas", "Mazan", "Napo", "Punchana", "Putumayo", "San Juan Bautista", "Teniente Manuel Clavero", "Torres Causana", "Yaguas"] },
            { "provincia": "Requena", "distritos": ["Alto Tapiche", "Capelo", "Emilio San Martin", "Maquia", "Puinahua", "Requena", "Saquena", "Soplin", "Tapiche", "Jenaro Herrera", "Yaquerana"] },
            { "provincia": "Ucayali", "distritos": ["Contamana", "Inahuaya", "Padre Marquez", "Pampa Hermosa", "Sarayacu", "Vargas Guerra"] }
        ]
    },
    {
        "departamento": "Madre de Dios",
        "provincias": [
            { "provincia": "Manu", "distritos": ["Fitzcarrald", "Huepetuhe", "Madre de Dios", "Manu"] },
            { "provincia": "Tahuamanu", "distritos": ["Iberia", "Iñapari", "Tahuamanu"] },
            { "provincia": "Tambopata", "distritos": ["Inambari", "Laberinto", "Las Piedras", "Tambopata"] }
        ]
    },
    {
        "departamento": "Moquegua",
        "provincias": [
            { "provincia": "General Sánchez Cerro", "distritos": ["Chojata", "Coalaque", "Ichuña", "La Capilla", "Lloque", "Matalaque", "Omate", "Puquina", "Quinistaquillas", "Ubinas", "Yunga"] },
            { "provincia": "Ilo", "distritos": ["El Algarrobal", "Ilo", "Pacocha"] },
            { "provincia": "Mariscal Nieto", "distritos": ["Carumas", "Cuchumbaya", "Moquegua", "Samegua", "San Cristobal", "Torata"] }
        ]
    },
    {
        "departamento": "Pasco",
        "provincias": [
            { "provincia": "Daniel Alcides Carrión", "distritos": ["Chacayan", "Goyllarisquizga", "Paucar", "San Pedro de Pillao", "Santa Ana de Tusi", "Tapuc", "Vilcabamba", "Yanahuanca"] },
            { "provincia": "Oxapampa", "distritos": ["Chontabamba", "Constitucion", "Huancabamba", "Oxapampa", "Palcazu", "Pozuzo", "Puerto Bermudez", "Villa Rica"] },
            { "provincia": "Pasco", "distritos": ["Chaupimarca", "Huachon", "Huariaca", "Huayllay", "Ninacaca", "Pallanchacra", "Paucartambo", "San Francisco de Asis de Yarusyacan", "Simon Bolivar", "Ticlacayan", "Tinyahuarco", "Vicco", "Yanacancha"] }
        ]
    },
    {
        "departamento": "Piura",
        "provincias": [
            { "provincia": "Ayabaca", "distritos": ["Ayabaca", "Frias", "Jilili", "Lagunas", "Montero", "Pacaipampa", "Paimas", "Sapillica", "Sicchez", "Suyo"] },
            { "provincia": "Huancabamba", "distritos": ["Canchaque", "El Carmen de la Frontera", "Huancabamba", "Huarmaca", "Lalaquiz", "San Miguel de El Faique", "Sondor", "Sondorillo"] },
            { "provincia": "Morropón", "distritos": ["Buenos Aires", "Chalaco", "Chulucanas", "La Matanza", "Morropon", "Salitral", "San Juan de Bigote", "Santa Catalina de Mossa", "Santo Domingo", "Yamango"] },
            { "provincia": "Paita", "distritos": ["Amotape", "Colan", "El Arenal", "La Huaca", "Paita", "Tamarindo", "Vichayal"] },
            { "provincia": "Piura", "distritos": ["Castilla", "Catacaos", "Cura Mori", "El Tallan", "La Arena", "La Union", "Las Lomas", "Piura", "Tambogrande", "Veintiseis de Octubre"] },
            { "provincia": "Sechura", "distritos": ["Bellavista de la Union", "Bernal", "Cristo Nos Valga", "Rinconada Llicuar", "Sechura", "Vice"] },
            { "provincia": "Sullana", "distritos": ["Bellavista", "Ignacio Escudero", "Lancones", "Marcavelica", "Miguel Checa", "Querecotillo", "Salitral", "Sullana"] },
            { "provincia": "Talara", "distritos": ["El Alto", "La Brea", "Lobitos", "Los Organos", "Mancora", "Pariñas"] }
        ]
    },
    {
        "departamento": "Puno",
        "provincias": [
            { "provincia": "Azángaro", "distritos": ["Achaya", "Arapa", "Asillo", "Azangaro", "Caminaca", "Chupa", "Jose Domingo Choquehuanca", "Muñani", "Potoni", "Saman", "San Anton", "San Jose", "San Juan de Salinas", "Santiago de Pupuja", "Tirapata"] },
            { "provincia": "Carabaya", "distritos": ["Ajoyani", "Ayapata", "Coasa", "Corani", "Crucero", "Ituata", "Macusani", "Ollachea", "San Gaban", "Usicayos"] },
            { "provincia": "Chucuito", "distritos": ["Desaguadero", "Huacullani", "Juli", "Kelluyo", "Pisacoma", "Pomata", "Zepita"] },
            { "provincia": "El Collao", "distritos": ["Capazo", "Conduriri", "Ilave", "Pilcuyo", "Santa Rosa"] },
            { "provincia": "Huancané", "distritos": ["Cojata", "Huancane", "Huatasani", "Inchupalla", "Pusi", "Rosaspata", "Taraco", "Vilque Chico"] },
            { "provincia": "Lampa", "distritos": ["Cabanilla", "Calapuja", "Lampa", "Nicasio", "Ocuviri", "Palca", "Paratia", "Pucara", "Santa Lucia", "Vilavila"] },
            { "provincia": "Melgar", "distritos": ["Antauta", "Ayaviri", "Cupi", "Llalli", "Macari", "Nuñoa", "Orurillo", "Santa Rosa", "Umachiri"] },
            { "provincia": "Moho", "distritos": ["Conima", "Huayrapata", "Moho", "Tilali"] },
            { "provincia": "Puno", "distritos": ["Acora", "Amantani", "Atuncolla", "Capachica", "Chucuito", "Coata", "Huata", "Mañazo", "Paucarcolla", "Pichacani", "Plateria", "Puno", "San Antonio", "Tiquillaca", "Vilque"] },
            { "provincia": "San Antonio de Putina", "distritos": ["Ananea", "Pedro Vilca Apaza", "Putina", "Quilcapuncu", "Sina"] },
            { "provincia": "San Román", "distritos": ["Cabana", "Cabanillas", "Caracoto", "Juliaca", "San Miguel"] },
            { "provincia": "Sandia", "distritos": ["Alto Inambari", "Cuyocuyo", "Limbani", "Patambuco", "Phara", "Quiaca", "San Juan del Oro", "San Pedro de Putina Punco", "Sandia", "Yanahuaya"] },
            { "provincia": "Yunguyo", "distritos": ["Anapia", "Copani", "Cuturapi", "Ollaraya", "Tinicachi", "Unicachi", "Yunguyo"] }
        ]
    },
    {
        "departamento": "San Martín",
        "provincias": [
            { "provincia": "Bellavista", "distritos": ["Alto Biavo", "Bajo Biavo", "Bellavista", "Huallaga", "San Pablo", "San Rafael"] },
            { "provincia": "El Dorado", "distritos": ["Agua Blanca", "San Jose de Sisa", "San Martin", "Santa Cruz", "Shatoja"] },
            { "provincia": "Huallaga", "distritos": ["Alto Saposoa", "El Eslabon", "Piscoyacu", "Sacanche", "Saposoa", "Tingo de Saposoa"] },
            { "provincia": "Lamas", "distritos": ["Alonso de Alvarado", "Barranquita", "Caynarachi", "Cuñumbuqui", "Lamas", "Pinto Recodo", "Rumisapa", "San Roque de Cumbaza", "Shanao", "Tabalosos", "Zapatero"] },
            { "provincia": "Mariscal Cáceres", "distritos": ["Campanilla", "Huicungo", "Juanjui", "Pachiza", "Pajarillo"] },
            { "provincia": "Moyobamba", "distritos": ["Calzada", "Habana", "Jepelacio", "Moyobamba", "Soritor", "Yantalo"] },
            { "provincia": "Picota", "distritos": ["Buenos Aires", "Caspisapa", "Picota", "Pilluana", "Pucacaca", "San Cristobal", "San Hilarion", "Shamboyacu", "Tingo de Ponasa", "Tres Unidos"] },
            { "provincia": "Rioja", "distritos": ["Awajun", "Elias Soplin Vargas", "Nueva Cajamarca", "Pardo Miguel", "Pósic", "Rioja", "San Fernando", "Yorongos", "Yuracyacu"] },
            { "provincia": "San Martín", "distritos": ["Alberto Leveau", "Cacatachi", "Chazuta", "Chipurana", "El Porvenir", "Huimbayoc", "Juan Guerra", "La Banda de Shilcayo", "Morales", "Papaplaya", "San Antonio", "Sauce", "Shapaja", "Tarapoto"] },
            { "provincia": "Tocache", "distritos": ["Nuevo Progreso", "Polvora", "Shunte", "Tocache", "Uchiza"] }
        ]
    },
    {
        "departamento": "Tacna",
        "provincias": [
            { "provincia": "Candarave", "distritos": ["Cairani", "Camilaca", "Candarave", "Curibaya", "Huanuara", "Quilahuani"] },
            { "provincia": "Jorge Basadre", "distritos": ["Ilabaya", "Ite", "Locumba"] },
            { "provincia": "Tacna", "distritos": ["Alto de la Alianza", "Calana", "Ciudad Nueva", "Coronel Gregorio Albarracin Lanchipa", "Inclan", "Pachia", "Palca", "Pocollay", "Sama", "Tacna"] },
            { "provincia": "Tarata", "distritos": ["Chucatamani", "Estique", "Estique-Pampa", "Sitajara", "Susapaya", "Tarata", "Tarucachi", "Ticaco"] }
        ]
    },
    {
        "departamento": "Tumbes",
        "provincias": [
            { "provincia": "Contralmirante Villar", "distritos": ["Canoas de Punta Sal", "Casitas", "Zorritos"] },
            { "provincia": "Tumbes", "distritos": ["Corrales", "La Cruz", "Pampas de Hospital", "San Jacinto", "San Juan de la Virgen", "Tumbes"] },
            { "provincia": "Zarumilla", "distritos": ["Aguas Verdes", "Matapalo", "Papayal", "Zarumilla"] }
        ]
    },
    {
        "departamento": "Ucayali",
        "provincias": [
            { "provincia": "Atalaya", "distritos": ["Raimondi", "Sepahua", "Tahuania", "Yurua"] },
            { "provincia": "Coronel Portillo", "distritos": ["Calleria", "Campoverde", "Iparia", "Manantay", "Masisea", "Nueva Requena", "Yarinacocha"] },
            { "provincia": "Padre Abad", "distritos": ["Curimana", "Irazola", "Padre Abad", "Alexander Von Humboldt", "Neshuya"] },
            { "provincia": "Purús", "distritos": ["Purus"] }
        ]
    }
]
