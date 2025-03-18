import { FaCcAmex, FaCcMastercard, FaCcVisa } from 'react-icons/fa';

export default function PaymentCardIcons(props: any) {
    const type = props.type;

    switch (type) {
        case 'visa':
            return <FaCcVisa size={40} />;
        case 'masterCard':
            return <FaCcMastercard size={40} />;
        case 'amex':
            return <FaCcAmex size={40} />;
        default:
            return <></>;
    }
}
