import logoImage from '../../assets/logo.svg';
import styles from './styles.module.scss';

export function MessageList() {
  return (
    <div className={styles.messageListWrapper}>
      <img src={logoImage} alt="DoWhile 21" />

      <ul className={styles.messageList}>
        <li className={styles.message}>
          <p className={styles.messageContent}>fghadskhgfjsdhgfk kfjgdshkhl f fdsghfjg ds gfhjdsgf ghjfds gkhf g</p>
          <div className={styles.messageUser}>
            <div className={styles.userImage}>
              <img src="https://github.com/ialexanderbrito.png" alt="Alexander" />
            </div>
            <span>Alexander</span>
          </div>
        </li>
        <li className={styles.message}>
          <p className={styles.messageContent}>fghadskhgfjsdhgfk kfjgdshkhl f fdsghfjg ds gfhjdsgf ghjfds gkhf g</p>
          <div className={styles.messageUser}>
            <div className={styles.userImage}>
              <img src="https://github.com/ialexanderbrito.png" alt="Alexander" />
            </div>
            <span>Alexander</span>
          </div>
        </li>
        <li className={styles.message}>
          <p className={styles.messageContent}>fghadskhgfjsdhgfk kfjgdshkhl f fdsghfjg ds gfhjdsgf ghjfds gkhf g</p>
          <div className={styles.messageUser}>
            <div className={styles.userImage}>
              <img src="https://github.com/ialexanderbrito.png" alt="Alexander" />
            </div>
            <span>Alexander</span>
          </div>
        </li>
      </ul>
    </div>
  );
}
