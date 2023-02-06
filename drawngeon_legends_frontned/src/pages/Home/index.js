import { SignUp, SignIn } from "../../components/Form";

import HomePage from "../../layouts/HomePage";

export function Home({ currentPage = "defaut" }) {
  const homePages = {
    signIn: <SignIn />,
    signUp: <SignUp />,
    about: <></>,
    games: <></>,
    game: <></>,
    rank: <></>,
    store: <></>,
    items: <></>,
    item: <></>,
    defaut: <></>,
  };

  return (
    <>
      <HomePage>
        {homePages[currentPage]}
      </ HomePage>
    </>
  );
}
