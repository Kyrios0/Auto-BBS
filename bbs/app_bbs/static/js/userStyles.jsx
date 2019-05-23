import css from 'styled-jsx/css'
//#region topBGv2Style
const topBGv2Style = css`
    .user {
        min-height: 160px;
        width: 100%;
        margin-bottom: -20px;
        padding-bottom: 20px;
        display: flex;
        align-items: flex-end;
    }
    .header-bg {
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        background-color: #222;
        background-position: 50%;
        background-size: 1400px auto;
        background-repeat: no-repeat;
        z-index: -1;
    }
    .header-overlay {
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        z-index: -1;
        background-position: 50%;
        background-size: 1400px 100%;
        background-image: linear-gradient(90deg,#222,rgba(34,34,34,.5) 50px,rgba(34,34,34,.25) 100px,transparent 200px,transparent 1200px,rgba(34,34,34,.25) 1300px,rgba(34,34,34,.5) 1350px,#222);
    }
    .header-overlay::before {
        content: "";
        background-image: linear-gradient(180deg,#222,transparent);
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
    }
    .header-wrapper {
        align-self: auto;
        margin-left: auto;
        margin-right: auto;
        flex: none;
        width: calc(100% - 40px);
        max-width: 960px;
    }
    .head-line {

    }
    .header-title {
        text-shadow: 0 1px 3px rgba(0,0,0,.75);
        font-size: 30px;
        color: #fff;
        margin: 0;
        font-style: normal;
    }
`
//#endregion

module.exports = {
    topBGv2Style: topBGv2Style,
}