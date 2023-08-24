// "use client";

import { Collection } from "@/app/components/Collection";
import { getUserCollection } from "../../../../db/utilities";

// import { Collection } from "../../components/Collection";
// import { CurrentUserContext } from "../../contexts/currentUser";
// import "../../styles/ProductsList.scss";
// import { useContext } from "react";

// const CollectionPage = () => {
//   const currentUser = useContext(CurrentUserContext).currentUser;
//   // console.log(currentUser);

//   return (
//     <div id="products-container">
//       <h1>Collections</h1>
//       <Collection userId={currentUser.id} />
//     </div>
//   );
// };

// export default CollectionPage;

const CollectionPage = async () => {
  return (
    <div id="products-container">
      <h1>Collections</h1>
      <Collection />
    </div>
  );
};

export default CollectionPage;
