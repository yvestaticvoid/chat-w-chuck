import Image from 'next/image'
import s_chat from '@/styles/Chat.module.scss'

export default function WelcomeMessage({picture}: {picture: string}) {

	return (
        <>
            <div className={`${s_chat.generated_inner_container}`}>
                <p className={`${s_chat.gen_text_inner_container}`}>
                    Start a conversation
                </p>
            </div>
            <div className={`${s_chat.chuck_message}`}>
                <Image src={picture} width={40} height={40} alt="Chuck Norris" className={`${s_chat.chuck_pp_image}`} />
                <div className={`${s_chat.message_text_container}`}>
                    <p className={`${s_chat.sender}`}>
                        Chuck Norris
                    </p>
                    <p className={`${s_chat.welcome_text}`}>
                        Soy el Bot de Asistencia de Chuck Norris. ¿Listo para sumergirte en el mundo de la leyenda viva? Estoy aquí para no ayudarte y no darte respuestas de poder. ¡Dispara tus preguntas! (O puedes pedirme un chiste, eso siempre funciona)
                    </p>
                </div>
            </div>
        </>
							
	)
}



