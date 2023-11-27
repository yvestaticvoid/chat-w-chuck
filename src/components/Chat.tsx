import styles_chat from '@/styles/Chat.module.scss'
import { useEffect, useState, useRef } from 'react'
import Message from '@/components/Message'
import WelcomeMessage from '@/components/WelcomeMessage'
import UpperBarActive from '@/components/UpperBarActive'
import UpperBarInactive from '@/components/UpperBarInactive'


// URL for Chuck Norris and user profile pictures
let pfpic_chuck = "https://wl-genial.cf.tsp.li/resize/728x/jpg/225/701/6612535fd88221c934e7819be8.jpg"

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
	"¡Por supuesto!",
    "¡Exacto!",
    "¡Claro que sí!",
    "¡Absolutamente!",
    "¡Sin duda!",
    "¡Por supuesto que lo sé!",
    "¡Chuck Norris aprueba eso!",
    "¡Como debe ser!",
    "¡Ni lo dudes!",
    "¡Correcto!",
	"Nope.",
    "Incorrecto.",
    "¡Ni de cerca!",
    "¡Eso no es así!",
    "¡Para nada!",
	"Chuck Norris no aprueba eso.",
    "Esa no es la manera de Chuck Norris.",
    "Esa afirmación no encaja en el mundo de Chuck Norris.",
    "Las posibilidades de eso son más bajas que enfrentarse a Chuck Norris en un duelo.",
    "Chuck Norris no se queda con respuestas incorrectas como esa.",
	"¡Eso es tan misterioso como la barba de un pato en invierno! ¿Reformulas esa pregunta para un humano mortal?",
	"Estoy seguro de que en un universo paralelo esa pregunta tiene sentido. Por aquí, sigue siendo un enigma.",
	"Tus palabras son más enigmáticas que el código de mis patadas giratorias. ¿Puedes simplificarlo para un maestro de artes marciales?",
	"¡Intrigante! Tan intrigante como verme derrotado... lo cual, obviamente, no sucede. ¿Alguna manera de aclarar eso?",
	"Esa pregunta es tan enigmática como los secretos que guardo en mi barba. ¿Podrías dar más pistas?",
	"Tus palabras son como el viento: misteriosas y difíciles de atrapar. ¿Intentamos con una versión simplificada?",
	"Eso es tan desconcertante como alguien esquivando mis puños. No lo capto del todo, ¿alguna pista adicional?",
	"¡Me siento como si estuviera en un laberinto con tu pregunta! ¿Hay un camino más directo hacia la claridad?",
	"Mis habilidades son legendarias, pero tu pregunta es un enigma del tamaño del universo. ¿Podrías aclararlo un poco?",
	"Hábilmente vago... me recuerda a las tácticas de un maestro ninja. ¿Intentamos una versión más directa?",
	"Chuck Norris no necesita saber las respuestas, las respuestas necesitan conocer a Chuck Norris.",
    "Si Chuck Norris no sabe la respuesta, es porque esa respuesta aún no existe.",
    "Las respuestas de Chuck Norris son tan certeras como sus golpes. ¡Impactantes y precisas!",
    "Chuck Norris no niega ni confirma. Simplemente decide qué es verdad y qué no lo es.",
    "Cuando Chuck Norris dice 'no sé', significa que el universo aún no está listo para saberlo.",
	"¡Oh, qué sorpresa! Una pregunta más...",
    "Interesante... como un libro infantil sobre Chuck Norris.",
    "Claro, porque preguntarle a Chuck es la solución a todo, ¿verdad?",
    "Vaya, una pregunta única y original...",
    "¡Oh, qué originalidad! Otra pregunta para Chuck Norris...",
    "Ah, ¿así que eso es lo que la gente está preguntando ahora?",
    "¡Qué maravillosa y única pregunta para el gran Chuck!",
    "Otra pregunta que desafía los límites de la originalidad.",
    "Chuck Norris ama las preguntas tan creativas como esta.",
    "¡Una pregunta que cambia el mundo! ¡Otra más!"
];

export default function Chat() {
	const [messages, setMessages] = useState<Message[]>([]);
	const [text, setText]: any = useState('');
	const [isWriting, setIsWriting] = useState(false);
	const [isHidden, setIsHidden] = useState(true);

	const scrollRef: any = useRef(null);

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
		if (scrollRef.current) {
			scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
			setText('');
		}
	}, [messages]);

	return (
		<>
			<div className={`${styles_chat.main}`}>
				
				<div onClick={hanldeChatOpen} className={`${isHidden ? styles_chat.container_hidden : styles_chat.display_none}`}>
					<UpperBarInactive />
				</div>
				<div className={`${isHidden ? styles_chat.display_none : styles_chat.container_active}`}>
					<div className={`${styles_chat.upper}`} onClick={hanldeChatOpen}>
						<UpperBarActive write={isWriting} />
					</div>
					<div className={`${styles_chat.chat_container}`} ref={scrollRef}>
						<div className={`${styles_chat.chat_inner_container}`}>
							<WelcomeMessage picture={pfpic_chuck}/>
							{messages.map((message: any, i: any) => (
								<Message key={i} msg={message}/>
							))}
						</div>
					</div>
					<form onSubmit={handleSubmit} className={`${styles_chat.form}`}>
						<div  className={`${styles_chat.form_inner}`}>
							<div className={`${styles_chat.button_container}`}>
								<button type='button' className={`${styles_chat.joke_button}`} onClick={handleButton}>
									Ask a Joke!
								</button>
							</div>
							<input className={`${styles_chat.input_message}`} type="text" value={text} onChange={(e => setText(e.target.value))} placeholder='Chuck, I need help with a T-shirt purchase...' />
							<button type='submit' className={`${text != '' ? styles_chat.submit_button_active : styles_chat.submit_button}`}>
								Ask
							</button>
						</div>
						<p className={`${styles_chat.powered}`}>
							Powered by 
							<span>
								ChuckfAI
							</span>
						</p>
					</form>
				</div>
			</div>
		</>
	)
}



