import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function FTButton(props)
{
	var { color, text, textColor, icon, className, toneValue, toneHoverValue} = props;
	color = color ?? 'blue';
	textColor = textColor ?? 'white';
	text = text ?? '';
	toneValue = toneValue ?? 900;
	toneHoverValue = toneHoverValue ?? 600;
	return (
		<button onClick={(e) => props.onClick(e)} className={`bg-${color}-${toneValue} hover:bg-${color}-${toneHoverValue} text-${textColor} font-bold py-2 px-4 border-b-4 border-${color}-700 hover:border-${color}-500 rounded ${className}`}>
			{ icon ? <FontAwesomeIcon className={'text-' + textColor} icon={icon}/> : '' }
			{ ' ' + text }
		</button> 
	);
}