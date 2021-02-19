import {Pagination } from 'semantic-ui-react'
import style from "./pagination.module.css";
export const MyPagination = (props) => {
return (<div className={style.pagination}>
            <Pagination boundaryRange={0}  ellipsisItem={null} firstItem={null} lastItem={null} onPageChange={props.handleChange} activePage={props.start} siblingRange={1} totalPages={props.pages}/>
        </div>)
}