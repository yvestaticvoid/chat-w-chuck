import s_chat from '@/styles/Chat.module.scss'
import { useEffect, useState } from 'react'

export default function ShareButton({text}: {text: string}) {
	const [share, setShare] = useState('');
    const joke = text;

	const handleClick = (e: any) => {
		// Checking if 'frase' exists and has a length greater than zero
		if (joke && joke.length > 0) {
			// Replacing spaces with '%20' in the string
			// creating URL-friendly strings, where spaces are encoded as %20.
			let formattedQuery = joke.replaceAll(" ", "%20");
			// Updating the 'share' state variable with the formatted query
			setShare(formattedQuery);
		}
	}

	useEffect(() => {
		const openTwitterIntent = () => {
			if (share) {
				window.open('https://twitter.com/intent/tweet?text=' + share, '_blank')
			}
		}
		openTwitterIntent();
	}, [share]);

	return (
        <>
            <div className={`${s_chat.button_inner_container}`}>
                <button className={`${s_chat.share_button}`} onClick={handleClick}>
					Share on Twitter
				</button>
            </div>
        </>
    )
}
