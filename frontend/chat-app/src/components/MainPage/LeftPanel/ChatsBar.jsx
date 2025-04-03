import React from "react";
import styles from './ChatsBar.module.css'
import SearchComponent from "./SearchComponent";
import ChatsContainer from "./ChatsContainer";
import BottomBar from "./BottomBar";

function ChatsBar() {
    return(
        <div className={styles["sidebar"]}>
            <SearchComponent/>

            <ChatsContainer/>

            <BottomBar/>
        </div>
    );
}

export default ChatsBar;