import styles_chat from '@/styles/Chat.module.scss'

export default function UpperBarInactive() {

	return (
		<>
            <div className={`${styles_chat.upper_container_hidden}`}>
                <p className={`${styles_chat.title}`}>
                    Chuck Norris
                </p>
                <button className={`${styles_chat.upper_btn}`}>
                    <span>
                        &#11205;
                    </span>
                </button>
            </div>
		</>
	)
}



