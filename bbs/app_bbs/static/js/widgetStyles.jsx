import css from 'styled-jsx/css'
//#region topBarStyle
const topBarStyle = css`
    #mainmenu {
        overflow: hidden;
        background-color: rgb(34, 34, 34);
    }
    .nav {
        max-width: 1000px;
        margin: 0 auto;
    }
    .left {
        display: flex;
    }
    .right {
        display: flex;
        justify-content: flex-end;
        flex: 1 1;
        align-items: center;
    }
    .ul {
        background-color: rgb(34, 34, 34);
    }
    .li {
        float: left;
        font-size: 1.085em;
    }
`
//#endregion
//#region topBGStyle
const topBGStyle = css`
    .head_bg {
        height: 190px;
        margin: 0 auto 5px;
        max-width: 1000px;
        overflow: hidden;
        display: flex;
        align-items: flex-end;
        background: rgba(0, 0, 0, 0) url("https://blog.kyrios.cn/wp-content/uploads/2019/04/bbs_head2.jpg") repeat scroll left bottom;
    }
    .head_bg::before {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-image: linear-gradient(180deg,transparent,rgba(0,0,0,.75));
        content: " ";
    }
    .title_wrapper {
        padding: 20px;
        text-align: left;
    }
    .title-image {
        margin: 20px 70px;
        width: 237px;
        height: 100px;
        background: rgba(0, 0, 0, 0) url("https://blog.kyrios.cn/wp-content/uploads/2019/03/logow_100px.png") repeat scroll 0% 0%;
    }
    .title-text {
        padding: 10px 0 10px 20px;
        width: 100%;
        font-weight: 500;
        font-size: 36px;
        font-style: italic;
        color: #fff;
        display: block;
    }
    .head_shadow {
        height: 191px;
        box-shadow: black 0px 0px 1.5em 0px inset;
    }
`
//#endregion
//#region threadLineStyle
const threadLineStyle = css`
    .topic_entry {
        margin: 0 40px;
    }
    .topic_entry_bg:hover {
        background-color: rgb(238, 238, 238);
    }
    .row {
        border-bottom: 1px solid #ccc;
        margin: 0 5px;
        align-items: center;
    }
    a {
        text-decoration: none;
        color: #1a3959;
    }
    a:hover {
        text-decoration: underline;
        color: #2c5787;     
    }
    .replies {
        font-size: 1.667em;
        color: rgb(238, 209, 175);
    }
    .postdate {
        display: block;
        overflow: hidden;
    }
    .topic_entry_content {
        padding: 6px;
        line-height: 1.83em;
        flex: none;
    }
    .c1 {
        width: 50px;
        text-align: center;
        padding-left: 1px;
        padding-right: 1px;
        white-space: nowrap;
    }
    .c2 {
        flex: 1;
        text-align: left;
    }
    .c3, .c4 {
        width: 140px;
        text-align: right;
        color: #58697b;
        font-size: 0.923em;
    }
`
//#endregion
//#region forumsStyle
const forumsStyle = css`
    .mod_wrap {
        text-align: center;
        margin: 0px 10px 8px 10px;
    }
    .forumbox {
        width: 100%;
        border-spacing: 1px;
        border: 1px solid #cacaca;
        box-shadow: 0 0 5px -3px #000;
        border-radius: 2.5px;
        margin: 4px auto;
        max-width: 1000px;
        background-color: white;
    }
    .forum_spacer {
        display: flex;
        align-items: center;
        margin: 30px 40px;
    }
    .btn_content {
        margin: 0 5px;
    }
`
//#endregion
//#region threadThemeStyle
const threadThemeStyle = css`
    .thread-theme {
        align-self: center;
        margin-left: auto;
        margin-right: auto;
        max-width: 1000px;
    }
    .thread-comment {
        align-self: center;
        margin-left: auto;
        margin-right: auto;
        max-width: 960px;
    }
    .forum-post {
        box-shadow: 0 1px 3px rgba(0,0,0,.25);
        background-color: #fff;
        margin-bottom: 5px;
        display: flex;
        flex-direction: row;
    }
    .forum-post-info {
        flex: none;
        display: flex;
        flex-direction: column;
        width: 180px;
    }
    .forum-post-body {
        flex: 1;
        display: flex;
        flex-direction: column;
    }
    .forum-post-info-main::before {
        position: absolute;
        content: " ";
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background-image: url(https://osu.ppy.sh/images/backgrounds/button.svg);
        background-size: 300px;
        opacity: .5;
    }
    .forum-post-info-main {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 20px;
        background-image: linear-gradient(180deg,transparent,rgba(0,0,0,.2));
        position: relative;
    }
    .lvl1 {
        background-color: #29b;
    }
    .avatar_wrapper {
        background-size: 153px 83px;
        padding: 0 30px;
    }
    .avatar {
        width: 100%;
        border: 5px solid #fff;
    }
    .forum-post-info-extra {
        background-color: hsla(0,0%,100%,.9);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex: 1 0 auto;
        padding: 10px;
        text-align: center;
    }
    .forum-post-info-extra-buttom {
        font-size: 11px;
        font-weight: 600;
        font-style: italic;
        color: #555;
        margin-bottom: 5px;
    }
    .forum-post-header-wrapper {
        font-size: 12px;
        padding: 20px 30px 0 30px;
    }
    .forum-post-header {
        color: #999;
    }
    .forum-post-content-wrapper {
        padding: 20px 30px;
    }
    .forum-post-content {
        font-family: Open Sans,sans-serif;
        line-height: 1.35;
        color: #444;
        font-size: 13px;
        line-height: 1.5;
    }
`
//#endregion

module.exports = {
    topBarStyle: topBarStyle,
    topBGStyle: topBGStyle,
    threadLineStyle: threadLineStyle,
    forumsStyle: forumsStyle,
    threadThemeStyle: threadThemeStyle,

}
