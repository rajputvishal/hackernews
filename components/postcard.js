import {getRelativeTime} from '../utility';
import { Card } from 'semantic-ui-react'
import {Icon } from 'semantic-ui-react'
import style from "./postcard.module.css";
const PostCard = function(props) {
    return (
        <Card link>
            <Card.Content>
          <Card.Header>{props.by}</Card.Header>
          <Card.Meta>{getRelativeTime(props.time)}</Card.Meta>
          <Card.Description>
            {props.title}
          </Card.Description>
        </Card.Content>
            <Card.Content extra>
          <div className={style["meta-info"]}>
            <a><Icon name='star' />{props.score}</a>
            <a>Comments{" "} {props.descendants}</a>
            <a href={props.url}><Icon name="linkify"></Icon></a>
          </div>
        </Card.Content>
        </Card>
    );
}

export default PostCard;