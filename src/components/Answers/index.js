import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    card: {
        margin: '10px',
        padding: '10px'
    }
})

const Answers = (props) => (
    <Grid
    container
    direction="row"
    justify="center"
    alignItems="center"
  >
        {props.answers.map((ans, i) => 
            (<Card className={props.classes.card} key={i} onClick={() => props.onSubmit(ans)}>
                <CardContent>
                    <Typography>
                        {ans}
                    </Typography>
                </CardContent>
            </Card> )
        )}
    </Grid>
)

export default withStyles(styles)(Answers);