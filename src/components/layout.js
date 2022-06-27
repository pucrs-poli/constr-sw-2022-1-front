import styles from "../styles/layout.module.css";
import Header from "./HeadTitle";
import Menu from "./Menu";


export default function Layout({ children }) {
    return (
        <div className={styles.layout}>
            <div style={{ gridArea: "header" }}>
                <Header />
            </div>
            <div style={{ gridArea: "navbar" }}>
                <Menu/>
            </div>
            <div style={{ gridArea: "content" }}>{children}</div>
        </div>
    );
}
