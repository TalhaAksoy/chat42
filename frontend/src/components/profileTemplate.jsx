import { faGear, faXmark } from '@fortawesome/free-solid-svg-icons';
import FTButton from './ftbutton';
import 'bootstrap/dist/css/bootstrap.css';

export default function ProfileTemplate(props)
{
	return (
		<div style={{ position: 'absolute' , top : '50%', left: '50%', transform: 'translate(-50%, -50%)'}} className="max-w-sm rounded overflow-y-scroll w-4/5 h-4/5 bg-white shadow-lg text-center">
			<img className="w-full" src="https://avatars.githubusercontent.com/u/25377153?v=4" alt="Sunset in the mountains"></img>
				<div className="px-6 py-4">
					<div className="font-bold text-xl mb-2">Login42 Proifl Bilgileri</div>
					<table className = "border-1 w-full">
						<tr>
							<td className = "border-1 w-2/5">
								<span className = "font-bold">
									Tam İsim :
								</span>
							</td>
							<td className = "border-1 w-3/5">
								<span>
									k.adi
								</span>
							</td>
						</tr>
						<tr>
							<td className = "border-1 w-2/5">
								<span className = "font-bold">
									E-mail :
								</span>
							</td>
							<td className = "border-1 w-3/5">
								<span>
									student@42istanbul.com.tr
								</span>
							</td>
						</tr>
						<tr>
							<td className = "border-1 w-2/5">
								<span className = "font-bold">
									Roller :
								</span>
							</td>
							<td className = "border-1 w-3/5">
								<span>
									Otostopçu
								</span>
							</td>
						</tr>
					</table>
				</div>
				<div className="px-6 pt-4 pb-2 flex flex-col">
					<FTButton className="text-white"
								color="blue"
								icon={faGear}
								toneValue="500"
								onClick={(e) => props.onButtonHandler(e)}
								text="Ayarlar" />
					<FTButton className="text-white"
								color="red"
								toneValue="500"
								icon={faXmark}
								onClick={(e) => props.onButtonHandler(e)}
								text="Kapat" />
				</div>
		</div>
	);
}