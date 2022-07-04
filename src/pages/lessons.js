import { Container, Box } from "@mui/material";
import Layout from "../components/layout";

export default function Lessons() {
    const mock = [
        {
            bannerColor: "red",
            lessonName: "Construção de Software",
            classNumber: "031",
            salaNumber: "409",
            buildingNumber: "32",
            teacher: "Prof. Eduardo Arruda",
        },
        {
            bannerColor: "yellow",
            lessonName: "Gestão Empresarial para Engenharia",
            classNumber: "030",
            salaNumber: "310",
            buildingNumber: "30",
            teacher: "Prof. Zilio Silva",
        },
        {
            bannerColor: "blue",
            lessonName: "Gestão de Projeto de Software",
            classNumber: "030",
            salaNumber: "213",
            buildingNumber: "32",
            teacher: "Profa. Alessandra Dutra",
        },
        {
            bannerColor: "brown",
            lessonName: "Engenharia de Software Experimental",
            classNumber: "031",
            salaNumber: "213",
            buildingNumber: "32",
            teacher: "Profa. Sabrina Marczak",
        },
        {
            bannerColor: "purple",
            lessonName: "Programação Distribuída",
            classNumber: "031",
            salaNumber: "216",
            buildingNumber: "32",
            teacher: "Prof. Sergio Filho",
        },
        {
            bannerColor: "green",
            lessonName: "Manutenção de Software",
            classNumber: "031",
            salaNumber: "213",
            buildingNumber: "32",
            teacher: "Prof. Marco Mangan",
        },
        {
            bannerColor: "pink",
            lessonName: "AGES 3",
            classNumber: "21",
            salaNumber: "409",
            buildingNumber: "32",
            teacher: "Prof. Daniel Callegari",
        },
    ];

    const bannerStyle = {
        height: 120,
        backgroundColor: "primary.dark",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    };
    const infoStyle = {
        backgroundColor: "#F5F5F5",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        padding: 1,
        paddingBottom: 2,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
    };

    return (
        <Layout>
            <Container sx={{ paddingBottom: 5 }}>
                {mock.map((tmp, index) => (
                    <Box key={index} sx={{ marginTop: 5 }}>
                        <Box
                            sx={[
                                bannerStyle,
                                { backgroundColor: tmp.bannerColor },
                            ]}
                        />
                        <Container sx={infoStyle}>
                            <h3>
                                {tmp.lessonName} - Turma {tmp.classNumber}, sala{" "}
                                {tmp.salaNumber} - Prédio {tmp.buildingNumber}
                            </h3>
                            <span>{tmp.teacher}</span>
                        </Container>
                    </Box>
                ))}
            </Container>
        </Layout>
    );
}
