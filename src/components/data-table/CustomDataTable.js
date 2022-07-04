import { Divider, Grid, Modal, Typography } from "@mui/material";
import React from "react";

export default class CustomDataTable extends React.Component {

    headers = [
        {
            title: '',
            columnSize: 0
        }
    ];
    bodyItems = [{
        imagePath: '',
        bodyItemTexts: ['']
    }]

    render() {
        return (
            <Grid item md={12}>
                {this.customDataTableHeader()}
                {/* Dados */}
                <Grid item md={12}>
                    <Grid item md={12}>
                        <Divider />
                    </Grid>
                </Grid>
                {this.customDataTableBody()}
            </Grid>
        );
    }

    customDataTableHeader() {
        if (!this.props.headers) {
            return;
        }

        return (
            <Grid container marginBottom={'5px'}>
                {
                    this.props.headers.map((header, indx) => < Grid item md={header.columnSize} marginTop={'10px'} key={indx}>
                        <Typography color="inherit" component="div" fontSize={'12pt'} fontWeight={'bold'} key={`${indx} - typography`}>
                            {header.title}
                        </Typography>
                    </Grid >
                    )
                }
            </Grid>
        );
    }

    customDataTableBody() {
        if (!this.props.bodyItems) {
            return;
        }

        return this.props.bodyItems.map((bodyItem, indx) => {
            return <Grid item md={12} marginTop={'20px'} key={indx} >
                <Grid container key={`${indx} - grid-container-image-text`}>
                    {bodyItem.bodyItemTexts.map((txt, indxTxt) =>
                        indxTxt == 0 ? (
                            <Grid item md={this.props.headers[indxTxt].columnSize} key={`${indxTxt} - grid-item-image-1-text`}>
                                <Typography color="inherit" component="div" fontSize={'12pt'} key={`${indxTxt} - typography`}>
                                    {bodyItem.imagePath ? <img src={bodyItem.imagePath} width={50} /> : null}
                                    <span style={{ verticalAlign: 'top', display: 'inline-block' }}>{txt}</span>
                                </Typography>
                            </Grid>

                        ) :

                            <Grid item md={this.props.headers[indxTxt].columnSize} key={`${indxTxt} - grid-body-text`} sx={{ wordBreak: 'break-all' }}>
                                <Typography color="inherit" component="div" fontSize={'12pt'} key={`${indxTxt} - typography`}>
                                    {txt}
                                </Typography>
                            </Grid>
                    )
                    }
                </Grid>

                <Divider key={`${indx} - div-item`} />
            </Grid>
        });
    }


    modal() {
        const style = {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '50%',
            height: '50%',
            bgcolor: 'white !important',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
        };

        return (
            <Modal sx={style}
                open={this.state.opened}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

            </Modal>
        );
    }


}
