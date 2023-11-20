import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import s_frases from '@/styles/Frases.module.css'
import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react'
const inter = Inter({ subsets: ['latin'] })
let pp_Norris = "https://wl-genial.cf.tsp.li/resize/728x/jpg/225/701/6612535fd88221c934e7819be8.jpg"
let no_pp = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"

type Message = {
	text: string,
	sender: string,
	type: string,
	name: string,
}
// TO-DO
// Generate Chuck Joke -> Create array with jokes from object :)
// Null, and empty handling (form gen. error handling)
// Adapt to small window (Customer Support like Chat)
// Scrollable chat like ChatGPT

// DONE
// Generate pred_answer when joke button not clicked 
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
const pred_answers = [
	'When Chuck Norris doesnt understand, he simply roundhouse kicks confusion out of existence. But your message... well, lets just say it left confusion scratching its head.',"I once asked Chuck Norris to understand your message. He replied, 'Some mysteries are better left unsolved.","Chuck Norris decoded ancient languages before breakfast, but your message might need a Rosetta Stone or two.","Even Chuck Norris takes a moment to ponder the enigmatic brilliance of your message. Or, you know, just stares at it blankly.","Your message has stumped lesser beings. Chuck Norris is considering translating it into Klingon for easier understanding.","Chuck Norris once deciphered hieroglyphics blindfolded. Your message? Well, it's a bit like ancient scribbles on a cave wall.","When Chuck Norris encounters the unknown, he usually stares it down till it confesses. Your message seems to enjoy its mystery.","Even Chuck Norris' beard can't fathom the depths of your message's complexity. Impressive.","Chuck Norris understands the universe's secrets, but your message seems to have taken a detour through the Bermuda Triangle.","Your message is like a riddle wrapped in a mystery inside an enigma... Chuck Norris usually just roundhouse kicks through such puzzles."
]

export default function Home() {

	const [share, setShare] = useState('');
	const [messages, setMessages] = useState<Message[]>([]);
	const [text, setText]: any = useState('');
	const [isWriting, setIsWriting] = useState(false);
	
	const handleClick = (e: any) => {
		let frase = e.target.value;
		if (frase && frase.length > 0) 
		{
			let formattedQuery = frase.replaceAll(" ", "%20");
			setShare(formattedQuery);
		}
	}

	useEffect(() => {
		const openTwitterIntent = () => {
			if(share)
			{
				window.open('https://twitter.com/intent/tweet?text=' + share, '_blank')
			}
		}
		openTwitterIntent();
	}, [share]);


	const handleSubmit = (e:any) => {
		e.preventDefault();

		if(text === '' || text === undefined || text === null) {
			return 0
		}

		handleUserSubmit(text);
		handleChuckAnswer();

		setText('');
	}

	const handleUserSubmit = (text:any) => {
		setTimeout(() => {
			setMessages(prevMessages => [...prevMessages, {text: text, sender: 'user', type: 'user ask', name: 'You'}]);
		}, 150)
	}

	const handleChuckAnswer = () => {

		const randomIndex = Math.floor(Math.random() * pred_answers.length);
		setIsWriting(true);

		setTimeout(() => {
			setIsWriting(false);
			setMessages(prevMessages => [...prevMessages, { text: pred_answers[randomIndex], sender: 'Chuck', type: 'ran_ans', name: 'Chuck Norris'}])
		}, 3000)

	}

	const handleButton = () => {
		
		const answers: any[] = [];
		answers.push(data.frases);

		const randomIndex = Math.floor(Math.random() * answers.length);
		const answer = answers[0][randomIndex].frase;
	
		setIsWriting(true);

		setTimeout(() => {
			setIsWriting(false);
			setMessages(prevMessages => [...prevMessages, { text: answer, sender: 'Chuck', type: 'joke', name: 'Chuck Norris'}])
		}, 1000)

	}

	return (
		<>
			<Head>
				<title>Create Next App</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className={`${styles.main} ${inter.className}`}>
				<p>Chuck Norris</p>
			    <div className={`${s_frases.container}`}>
					<div className={`${s_frases.chat_container}`}>
						<div className={`${s_frases.chat}`}>
							{messages.map((message: any, i:any) => (
								<div key={i} className={`${s_frases.inner_container}`}>
									<div className={`${message.sender === "user" ? s_frases.message : s_frases.inner_container_answer}`}>
										{
											message.sender == 'user' ? (
												<Image src={no_pp} width={40} height={40} alt="User profile picture" className={`${s_frases.user_pp_image}`}/>
											) : (
												<Image src={pp_Norris} width={40} height={40} alt="Chuck Norris" className={`${s_frases.chuck_pp_image}`}/>
											)
										}
										<div className={`${s_frases.message_text_container}`}>
											<p className={`${s_frases.name}`}>{message.name}</p>
											<p className={`${s_frases.frase}`}>{message.text}</p>
										</div>
									</div>
									{
										message.type === "joke" && (
											<button className={`${s_frases.share_button}`} onClick={handleClick} value={message.text}>Share</button>
										)
									}
								</div>
							))}
						</div>
					</div>
					<form onSubmit={handleSubmit} >
						<div className={`${s_frases.button_container}`}>
							<button type='button' className={`${s_frases.joke_button}`} onClick={handleButton}>Ask Chuck a Joke!</button>
						</div>
						<input className={`${s_frases.input_message}`} type="text" value={text} onChange={(e => setText(e.target.value))} placeholder='Chuck, I need help with a T-shirt purchase...'/>
						<button type='submit' className={`${s_frases.submit_button}`}>Ask</button>
					</form>
				</div>
			</main>
		</>
	)
}
