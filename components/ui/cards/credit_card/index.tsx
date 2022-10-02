import React from 'react'

type Props = {
    type: string;
    bank: string;
    cardNumber: number | string;
    cardHolder: string;
    className?: string;
}

const CreditCard = (props: Props) => {
    return (
        <div className="relative mx-auto text-neutral-500 h-fit rounded-2xl overflow-hidden">
            <CardSVG className={["w-full h-full", props.className].join(" ")} />
            <p className="absolute top-8 left-5  text-[0.5em] text-neutral-500 font-thin">
                Virtual Card
            </p>
            <p className="absolute text-[0.65em] top-8 right-5  text-right font-light whitespace-nowrap">
                {props.bank}
            </p>
            <p className="absolute text-base font-light bottom-12 left-5 max-w-[20ch] text-right text-neutral-400">
                {props.cardNumber}
            </p>
            <p className="absolute text-[0.6em] font-light bottom-8 left-5 max-w-[20ch] text-right text-neutral-500">
                {props.cardHolder}
            </p>
            <p className="absolute text-lg italic font-thin text-right text-neutral-300 right-5 bottom-8">
                {props.type || "VISA"}
            </p>
        </div>
    )
}

function CardSVG({ ...props }) {
    return (
        <svg
            width="328"
            height="205"
            viewBox="0 0 328 205"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <rect
                width="328"
                height="205"
                rx="8"
                fill="currrentColor"
                className="drop-shadow-md"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M30 71C27.7909 71 26 72.7909 26 75V99C26 101.209 27.7909 103 30 103H70C72.2091 103 74 101.209 74 99V75C74 72.7909 72.2091 71 70 71H30ZM33 73C30.7909 73 29 74.7909 29 77V79H41V73H33ZM41 81H29V92H41L41 81ZM41 94H29V97C29 99.2091 30.7909 101 33 101H41V94ZM59 73V79H71V77C71 74.7909 69.2091 73 67 73H59ZM59 101V94H71V97C71 99.2091 69.2091 101 67 101H59ZM71 92H59V81H71V92Z"
                fill="#737070"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M91.3443 92.9396C92.8711 91.3336 93.7226 89.2025 93.7227 86.9866C93.7227 84.7705 92.8712 82.6391 91.3443 81.0329C91.2263 80.9121 91.2278 80.7186 91.3477 80.5996L92.5143 79.4432C92.5751 79.383 92.6574 79.3494 92.743 79.35C92.8285 79.3505 92.9104 79.3852 92.9703 79.4462C97.0099 83.6613 97.0099 90.3111 92.9703 94.5262C92.9103 94.5873 92.8285 94.6218 92.7429 94.6223C92.6573 94.6228 92.5751 94.5892 92.5143 94.5289L91.3477 93.3729C91.228 93.2538 91.2265 93.0605 91.3443 92.9396ZM89.927 86.9866C89.9271 88.2041 89.4746 89.3782 88.6573 90.2806C88.5414 90.4027 88.5439 90.595 88.663 90.714L89.8297 91.8686C89.8909 91.9294 89.9739 91.9632 90.0602 91.9623C90.1464 91.9614 90.2287 91.926 90.2887 91.864C92.8451 89.1158 92.8451 84.8598 90.2887 82.1116C90.2287 82.0496 90.1464 82.0141 90.0601 82.0133C89.9738 82.0125 89.8908 82.0464 89.8297 82.1073L88.663 83.2616C88.5439 83.3806 88.5414 83.5729 88.6573 83.695C89.474 84.5968 89.9265 85.7699 89.927 86.9866ZM87.1427 89.2056C87.2033 89.2673 87.2867 89.3013 87.3732 89.2996C87.4597 89.2978 87.5416 89.2604 87.5997 89.1962C88.6786 87.9207 88.6786 86.0525 87.5997 84.7769C87.5417 84.7127 87.4598 84.6752 87.3733 84.6734C87.2868 84.6716 87.2033 84.7055 87.1427 84.7672L85.127 86.7649C85.0678 86.8235 85.0344 86.9033 85.0344 86.9866C85.0344 87.0699 85.0678 87.1497 85.127 87.2082L87.1427 89.2056Z"
                fill="#626262"
            />
        </svg>
    );
}

export default CreditCard