import s_chat from '@/styles/Chat.module.scss'

export default function UpperBarActive({write}: {write: any}) {

	return (
        <>
            <div className={`${s_chat.upper}`}>
                <p className={`${s_chat.title}`}>
                    Chuck Norris{ write && ' is writing...'}
                </p>
                <button className={`${s_chat.upper_btn} `}>
                    <span>
                        &#11206;
                    </span>
                </button>
            </div>
        </>
	)
}



