import * as React from "react";

import { Link } from "react-router-dom";

import * as styles from "readium-desktop/renderer/assets/styles/breadcrumb.css";

import * as ArrowIcon from "readium-desktop/renderer/assets/icons/arrow-left.svg";
import SVG from "readium-desktop/renderer/components/utils/SVG";

import * as classNames from "classnames";

export interface BreadCrumbItem {
    name: string;
    path?: string;
    state?: any;
}

interface BreadCrumbProps {
    breadcrumb: BreadCrumbItem[];
    search: any;
    className?: string;
}

export default class BreadCrumb extends React.Component<BreadCrumbProps, undefined> {
    public render(): React.ReactElement<{}> {
        const { breadcrumb } = this.props;
        return (
            <div className={classNames([styles.breadcrumb, this.props.className])}>
                { this.props.breadcrumb.length >= 2 &&
                    <Link to={{pathname: breadcrumb[breadcrumb.length - 2].path, search: this.props.search}}>
                        <SVG svg={ArrowIcon}/>
                    </Link>
                }
                {this.props.breadcrumb && this.props.breadcrumb.map((item, index) =>
                    item.path ?
                        <Link key={index} to={{
                            pathname: item.path,
                            search: this.props.search,
                            state: item.state,
                        }}>{ item.name } /</Link>
                    :
                        <span key={index} >{ item.name }</span>,
                )}
            </div>
        );
    }
}
