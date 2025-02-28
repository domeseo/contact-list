import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import Contador from "../components/GetContact.jsx";
import FirstComponent from "../components/GetContact.jsx";
import { CreateUser } from "../components/CreateUserAgenda.jsx";
import CreateNewContact from "../components/CreateNewContact.jsx";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()

	return (
		<div className="text-center mt-5">
			<FirstComponent />
			<CreateUser />
			<CreateNewContact user="dome" />
		</div>
	);
}; 