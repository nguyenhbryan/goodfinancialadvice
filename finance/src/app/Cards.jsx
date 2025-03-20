import styles from "./Cards.module.css";

function cards(props) {
    return (
        <div className={styles.card_container}>
            <div>
                <img src={props.image} className={styles.image_container}></img>
                <div className={styles.text_container}>
                    <p>{props.name}</p>
                    <button className={styles.play_button} href={props.link}>
                        <svg className={styles.icons} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="m380-300 280-180-280-180v360ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" /></svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default cards;