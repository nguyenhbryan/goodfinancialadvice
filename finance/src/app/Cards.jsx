import styles from "./Cards.module.css";

function cards(props) {
    return (
        <div className={styles.card_container}>
            <div>
                <p>{props.name}</p>
                <img src={props.image} className={styles.image_container}></img>
            </div>
        </div>
    );
}

export default cards;