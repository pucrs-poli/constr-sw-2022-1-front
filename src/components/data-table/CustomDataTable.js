import { Divider, Grid, Typography } from "@mui/material";
import React from "react";


export default class CustomDataTable extends React.Component {

    headerTitles = [''];
    bodyItems = [{
        imagePath: '',
        bodyItemTexts: ['']
    }]

    render() {
        return (
            <Grid item md={10}>
                {this.CustomDataTableHeader()}
                {/* Dados */}
                <Grid item md={12}>
                    <Grid item md={12}>
                        <Divider />
                    </Grid>
                </Grid>
                {this.CustomDataTableBody()}
            </Grid>
        );
    }

    CustomDataTableHeader() {
        if (!this.props.headerTitles) {
            return;
        }

        return (
            <Grid container marginBottom={'5px'}>
                {
                    this.props.headerTitles.map((title, indx) => < Grid item md={indx == 0 ? 6 : 2} marginTop={'10px'} key={indx}>
                        <Typography color="inherit" component="div" fontSize={'12pt'} fontWeight={'bold'} key={`${indx} - typography`}>
                            {title}
                        </Typography>
                    </Grid >
                    )
                }
            </Grid>
        );
    }

    CustomDataTableBody() {
        if (!this.props.bodyItems) {
            return;
        }

        return this.props.bodyItems.map((bodyItem, indx) => {
            return <Grid item md={12} marginTop={'20px'} key={indx}>
                <Grid container key={`${indx} - grid-container-image-text`}>
                    {bodyItem.bodyItemTexts.map((txt, indxTxt) =>
                        indxTxt == 0 ? (
                            <Grid item md={6} key={`${indxTxt} - grid-item-image-1-text`}>
                                <Typography color="inherit" component="div" fontSize={'12pt'} key={`${indxTxt} - typography`}>
                                    <img src={bodyItem.imagePath} width={50} />
                                    <span style={{ verticalAlign: 'top', display: 'inline-block' }}>{txt}</span>
                                </Typography>
                            </Grid>

                        ) :
                            <Grid item md={2} key={`${indxTxt} - grid-body-text`}>
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


}
