import Image from 'next/image'
import s_chat from '@/styles/Chat.module.scss'
import ShareButton from '@/components/ShareButton'

// URL for Chuck Norris and user profile pictures
let pfpic_chuck = "https://wl-genial.cf.tsp.li/resize/728x/jpg/225/701/6612535fd88221c934e7819be8.jpg"
let pfpic_user = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"

export default function Message({msg}: {msg: any}) {
const message = msg;

return (
    <>
        {
            message.type === "joke" && (
                <div className={`${s_chat.generated_inner_container}`}>
                    <p className={`${s_chat.gen_text_inner_container}`}>
                        Generated using Ask a Joke!
                    </p>
                </div>
            )
        }
        <div className={`${message.sender === "user" ? s_chat.user_message : s_chat.chuck_message}`}>
            {
                message.sender == 'user' ? (
                    <Image src={pfpic_user} width={40} height={40} alt="User profile picture" className={`${s_chat.user_pp_image}`} />
                ) : (
                    <Image src={pfpic_chuck} width={40} height={40} alt="Chuck Norris" className={`${s_chat.chuck_pp_image}`} />
                )
            }
            <div className={`${s_chat.message_text_container}`}>
                <p className={`${s_chat.sender}`}>
                    {message.name} at {message.time}
                </p>
                <p className={`${s_chat.message_body}`}>
                    {message.text}
                </p>
            </div>
        </div>
        {
            message.type === "joke" && (
                <ShareButton text={message.text}/>
            )

        }
    </>
)
}



