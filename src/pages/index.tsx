import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import s_frases from '@/styles/Frases.module.css'
import styles from '@/styles/Home.module.css'
import { useEffect, useState, useRef } from 'react'

const inter = Inter({ subsets: ['latin'] })

// URL for Chuck Norris and user profile pictures
let pfpic_chuck = "https://wl-genial.cf.tsp.li/resize/728x/jpg/225/701/6612535fd88221c934e7819be8.jpg"
let pfpic_user = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"

// Defines the structure of a message object
type Message = {
	text: string,     // Content of the message
	sender: string,   // Sender's identifier
	type: string,     // Type of message (e.g., 'text', 'image')
	name: string,     // Name associated with the message
	time: any,        // Timestamp
}

const data =
{
	"frases": [
		{
			"imagen": "images/chucktellamaaltelefono.jpg",
			"frase": "Si te llama chuck norris, tienes dos opciones, contestar o contestar",
			"id": "1",
			"idioma": "español",
			"categoria": "tecnologia"
		},
		{
			"imagen": "images/experienciacercanamuerte.jpg",
			"frase": "En una ocasion la muerte tuvo una experiencia cercana a chuck norris",
			"id": "2",
			"idioma": "español",
			"categoria": "salud"
		},
		{
			"imagen": "images/infartossobrevivieronachuck.jpeg",
			"frase": "Chuck norris no sobrevivió a dos infartos, los infartos sobrevivieron a chuck norris",
			"id": "3",
			"idioma": "español",
			"categoria": "salud"
		},
		{
			"imagen": "images/lagrimascurancancer.jpg",
			"frase": "Sus lagrimas curan el cancer. Es una pena que el no ha llorado nunca",
			"id": "4",
			"idioma": "español",
			"categoria": "salud"
		},
		{
			"imagen": "images/martillodethor.jpg",
			"frase": "Thor sacó su martillo, de la caja de herramientas de chuck norris",
			"id": "5",
			"idioma": "español",
			"categoria": "comics"
		},
		{
			"imagen": "images/noleelibros.jpg",
			"frase": "Chuck Norris no lee libros. Los mira fijamente hasta que consigue la informacion que quiere...",
			"id": "6",
			"idioma": "español",
			"categoria": "lectura"
		},
		{
			"imagen": "images/nuncaafoteesachuck.png",
			"frase": "Cuando chuck norris nació... la unica persona que lloró fue el doctor. Nunca afotees a chuck ",
			"id": "7",
			"idioma": "español",
			"categoria": "salud"
		},
		{
			"imagen": "images/pokemonGo.webp",
			"frase": "Chuck norris ya ha capturado todos los pokemons... desde un telefono fijo",
			"id": "8",
			"idioma": "español",
			"categoria": "tecnologia"
		},
		{
			"imagen": "images/serieporultimavez.png",
			"frase": "El que rie ultimo, rie mejor. Pero aquel que se rie de chuck, se rie por ultima vez.",
			"id": "9",
			"idioma": "español",
			"categoria": "humor"
		},
		{
			"imagen": "images/teoriadeevolucion.png",
			"frase": "No hay teoria de la evolucion. Solo una lista de criaturas que chuck deja vivir",
			"id": "10",
			"idioma": "español",
			"categoria": "biologia"
		},
		{
			"imagen": "images/tequedan7dias.jpg",
			"frase": "La chica del aro llama a chuck norris y chuck le avisa que le quedan 7 dias",
			"id": "11",
			"idioma": "español",
			"categoria": "horror"
		}
	]
}
// Array of predefined answers in Chuck Norris style
const pred_answers = [
	"¡Eso es tan misterioso como la barba de un pato en invierno! ¿Reformulas esa pregunta para un humano mortal?",
	"Estoy seguro de que en un universo paralelo esa pregunta tiene sentido. Por aquí, sigue siendo un enigma.",
	"Tus palabras son más enigmáticas que el código de mis patadas giratorias. ¿Puedes simplificarlo para un maestro de artes marciales?",
	"¡Intrigante! Tan intrigante como verme derrotado... lo cual, obviamente, no sucede. ¿Alguna manera de aclarar eso?",
	"Esa pregunta es tan enigmática como los secretos que guardo en mi barba. ¿Podrías dar más pistas?",
	"Tus palabras son como el viento: misteriosas y difíciles de atrapar. ¿Intentamos con una versión simplificada?",
	"Eso es tan desconcertante como alguien esquivando mis puños. No lo capto del todo, ¿alguna pista adicional?",
	"¡Me siento como si estuviera en un laberinto con tu pregunta! ¿Hay un camino más directo hacia la claridad?",
	"Mis habilidades son legendarias, pero tu pregunta es un enigma del tamaño del universo. ¿Podrías aclararlo un poco?",
	"Hábilmente vago... me recuerda a las tácticas de un maestro ninja. ¿Intentamos una versión más directa?"
];


export default function Home() {
	const [share, setShare] = useState('');
	const [messages, setMessages] = useState<Message[]>([]);
	const [text, setText]: any = useState('');
	const [isWriting, setIsWriting] = useState(false);
	const [isHidden, setIsHidden] = useState(true);

	const scrollRef: any = useRef(null);

	const handleClick = (e: any) => {
		// Extracting the value from the event target
		let frase = e.target.value;
		// Checking if 'frase' exists and has a length greater than zero
		if (frase && frase.length > 0) {
			// Replacing spaces with '%20' in the string
			// creating URL-friendly strings, where spaces are encoded as %20.
			let formattedQuery = frase.replaceAll(" ", "%20");
			// Updating the 'share' state variable with the formatted query
			setShare(formattedQuery);

		}
	}

	const handleSubmit = (e: any) => {

		e.preventDefault();
		if (text === '' || text === undefined || text === null) {
			return 0;
		}
		handleUserSubmit(text);
		handleChuckAnswer();
		setText('');
	}

	const timeOfMessage = () => {
		// Get the current time
		const currentTime = new Date();

		const hour = currentTime.getHours();
		const minute = currentTime.getMinutes();

		// Format the time as HH:MM
		const formattedTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
		return formattedTime;
	}

	const handleUserSubmit = (text: any) => {

		const timeofmsg = timeOfMessage();

		setTimeout(() => {
			setMessages(prevMessages => [
				...prevMessages,
				{
					text: text,
					sender: 'user',
					type: 'user ask',
					name: 'You',
					time: timeofmsg
				}
			]);
		}, 150)
	}

	const handleChuckAnswer = () => {

		const randomIndex = Math.floor(Math.random() * pred_answers.length);
		const timeofmsg = timeOfMessage();

		setIsWriting(true);
		setTimeout(() => {

			setIsWriting(false);
			setMessages(prevMessages => [
				...prevMessages,
				{
					text: pred_answers[randomIndex],
					sender: 'Chuck',
					type: 'ran_ans',
					name: 'Chuck Norris',
					time: timeofmsg
				}

			])
		}, 3000)

	}

	const handleButton = () => {

		const answers: any[] = [];
		answers.push(data.frases);
		const randomIndex = Math.floor(Math.random() * answers[0].length);
		const answer = answers[0][randomIndex].frase;
		const timeofmsg = timeOfMessage();

		setIsWriting(true);
		setTimeout(() => {
			setIsWriting(false);
			setMessages(prevMessages => [
				...prevMessages,
				{
					text: answer,
					sender: 'Chuck',
					type: 'joke',
					name: 'Chuck Norris',
					time: timeofmsg
				}
			])
		}, 1000)

	}

	const hanldeChatOpen = () => {
		setIsHidden(!isHidden);
	}

	useEffect(() => {
		const openTwitterIntent = () => {
			if (share) {
				window.open('https://twitter.com/intent/tweet?text=' + share, '_blank')
			}
		}
		openTwitterIntent();
	}, [share]);


	useEffect(() => {
		if (scrollRef.current) {
			scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
			setText('');
		}
	}, [messages]);

	return (
		<>
			<Head>
				<title>Create Next App</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className={`${s_frases.main} ${inter.className}`}>
				<>
					<div className={`${isHidden ? s_frases.container_hidden : s_frases.hide}`}>
						<div className={`${s_frases.utils_hidden}`}>
							<div className={`${s_frases.utils_container_hidden}`}>
								<p className={`${s_frases.title}`}>Chuck Norris</p>
								<button onClick={hanldeChatOpen} className={`${s_frases.open_btn}`}><span className={`${s_frases.close_arrow}`}>&#11165;</span></button>
							</div>
						</div>
					</div>
				</>
				<div className={`${isHidden ? s_frases.hide : s_frases.container}`}>
					<div className={`${s_frases.utils}`}>
						<div className={`${s_frases.utils_container}`}>
							<p className={`${s_frases.title}`}>Chuck Norris</p>

							<button onClick={hanldeChatOpen} className={`${s_frases.close_btn} ${s_frases.open} `}><span className={`${s_frases.close_arrow}`}>&#11165;</span></button>
						</div>
					</div>
					<div className={`${s_frases.chat_container}`} ref={scrollRef}>
						<div className={`${s_frases.chat}`}>
							<div className={`${s_frases.inner_container}`}>

								<div className={`${s_frases.generated_inner_container}`}>
									<p className={`${s_frases.gen_text_inner_container}`}>
										Start a conversation
									</p>
								</div>
								<div className={`${s_frases.inner_container_answer}`}>
									<Image src={pfpic_chuck} width={40} height={40} alt="Chuck Norris" className={`${s_frases.chuck_pp_image}`} />
									<div className={`${s_frases.message_text_container}`}>
										<p className={`${s_frases.name}`}>Chuck Norris now</p>
										<p className={`${s_frases.frase}`}>Soy el Bot de Asistencia de Chuck Norris. ¿Listo para sumergirte en el mundo de la leyenda viva? Estoy aquí para ayudarte con datos legendarios y respuestas de poder. ¡Dispara tus preguntas!</p>
									</div>
								</div>
							</div>
							{messages.map((message: any, i: any) => (
								<div key={i} className={`${s_frases.inner_container}`}>
									{
										message.type === "joke" && (
											<div className={`${s_frases.generated_inner_container}`}>
												<p className={`${s_frases.gen_text_inner_container}`}>
													Generated using Ask a Joke!
												</p>
											</div>
										)
									}
									<div className={`${message.sender === "user" ? s_frases.message : s_frases.inner_container_answer}`}>
										{
											message.sender == 'user' ? (
												<Image src={pfpic_user} width={40} height={40} alt="User profile picture" className={`${s_frases.user_pp_image}`} />
											) : (
												<Image src={pfpic_chuck} width={40} height={40} alt="Chuck Norris" className={`${s_frases.chuck_pp_image}`} />
											)
										}
										<div className={`${s_frases.message_text_container}`}>
											<p className={`${s_frases.name}`}>{message.name} at {message.time}</p>
											<p className={`${s_frases.frase}`}>{message.text}</p>
										</div>
									</div>
									{
										message.type === "joke" && (
											<div className={`${s_frases.button_inner_container}`}>
												<button className={`${s_frases.share_button}`} onClick={handleClick} value={message.text}>Share</button>
											</div>
										)
									}
								</div>
							))}
						</div>
					</div>
					<form onSubmit={handleSubmit} className={`${s_frases.form}`}>
						<div>
							<div className={`${s_frases.button_container}`}>
								<button type='button' className={`${s_frases.joke_button}`} onClick={handleButton}>Ask a Joke!</button>
							</div>
							<input className={`${s_frases.input_message}`} type="text" value={text} onChange={(e => setText(e.target.value))} placeholder='Chuck, I need help with a T-shirt purchase...' />
							<button type='submit' className={`${s_frases.submit_button}`}>Ask</button>
						</div>
						<p className={`${s_frases.powered}`}>Powered by <span>ChuckfAI</span></p>
					</form>
				</div>
			</main>
		</>
	)
}


{/* <p className={`${s_frases.title}`}>{
	isWriting && (
		"is Writing..."
	)
}</p> */}