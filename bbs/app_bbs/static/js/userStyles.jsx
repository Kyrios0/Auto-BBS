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
//#region profileStyle
const profileStyle = css`
    .mod-wrapper {
        background-color: #2c3532;
        color: #fff;
        margin-bottom: 10px;
        width: calc(100% - 40px);
        max-width: 1000px;
        align-self: center;
        margin-left: auto;
        margin-right: auto;
        flex: none;
    }
    .profile-top {
        display: flex;
        flex-direction: row;
    }
    .profile-info {
        align-self: flex-start;
        padding-left: 70px;
        flex: 1;
        width: auto;
        min-width: 0;
        text-shadow: 0 1px 3px rgba(0,0,0,.75);
        display: flex;
        padding: 20px;
        color: #fff;
    }
    .avatar-wrapper {
        transform: translateZ(0);
        flex: none;
        width: 120px;
        height: 120px;
        border-radius: 25%;
        overflow: hidden;
    }
    .profile-info-avatar {
        width: 100%;
        vertical-align: middle;
    }
    .profile-info-details {
        padding-left: 10px;
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
    }
    .profile-info-name {
        align-self: flex-start;
        color: #fff;
        padding: 0;
        margin: 0;
        font-size: 24px;
        font-weight: 400;
        font-style: normal;
        line-height: normal;
        max-width: 100%;
        display: flex;
    }
`
//#endregion
module.exports = {
    topBGv2Style: topBGv2Style,
    profileStyle: profileStyle,

}