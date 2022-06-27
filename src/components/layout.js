import styles from "../styles/layout.module.css";
import Header from "./HeadTitle";

export default function Layout({ children }) {
    return (
        <div className={styles.layout}>
            <div style={{ gridArea: "header" }}>
                <Header />
            </div>
            <div style={{ gridArea: "navbar" }}>Sidebar</div>
            <div style={{ gridArea: "content" }}>{children}</div>
        </div>
    );
}
