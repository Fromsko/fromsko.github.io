---
title: container实现
createTime: 2024/10/30 11:07:38
permalink: /article/aery5nl3/
---
# Container for android

> vistied android container.

## core file

> 核心文件为 `tmoe` `manager`

```shell
# 环境目录
/data/data/com.termux/files/home/.local/share/tmoe-linux/git/share/old-version/share/app

# 子容器目录
/data/data/com.termux/files/home/.local/share/tmoe-linux/containers/proot
```

---

`lnk_menu`

```sh
#!/data/data/com.termux/files/usr/bin/env bash
#########################
main() {
    check_chroot_file
    source_env_file
    check_tmoe_container_chroot
    start_menu
}
################
source_env_file() {
    case $(uname -o) in
    Android) TMOE_LINUX_DIR="${HOME}/.local/share/tmoe-linux" ;;
    *)
        TMOE_LINUX_DIR="/usr/local/etc/tmoe-linux"
        TMPDIR=/tmp
        ;;
    esac
    TMOE_GIT_DIR="${TMOE_LINUX_DIR}/git"
    TMOE_SHARE_DIR="${TMOE_GIT_DIR}/share/old-version/share"
    TMOE_CONTAINER_DIR="${TMOE_LINUX_DIR}/containers"
    ENV_FILE="${TMOE_SHARE_DIR}/environment/manager_environment"
    source ${ENV_FILE}
}
###########
check_chroot_file() {
    CONFIG_FOLDER=${HOME}/.config/tmoe-linux
    TMOE_CHROOT=false
    [[ ! -e "${CONFIG_FOLDER}/chroot_container" ]] || TMOE_CHROOT=true
}
###########
start_menu() {
    source ${TMOE_SHARE_DIR}/container/list
    check_proot_or_chroot
    RETURN_TO_WHERE_02='exit'
    list_installed_tmoe_containers
}
main "$@"
```

`debian`

```sh
#!/data/data/com.termux/files/usr/bin/env bash
############
debian_main() {
    case "$1" in
    i* | -i* | -I*)
        debian-i
        exit 0
        ;;
    -h* | --h*)
        printf "%s\n" "暂无帮助信息"
        ;;
    -m* | m*)
        debian-i -m
        ;;
    -vnc* | vnc*)
        startx11vnc
        ;;
    -n* | novnc*)
        debian-i novnc
        ;;
    -x)
        startxsdl
        ;;
    *) start_tmoe_gnu_linux_default_container ;;
    esac
}
#########
start_tmoe_gnu_linux_default_container() {
    CONFIG_FOLDER=${HOME}/.config/tmoe-linux
    [[ $(uname -o) = 'Android' ]] || PREFIX=/usr/local
    if [ -e "${CONFIG_FOLDER}/chroot_container" ]; then
        bash ${PREFIX}/bin/tmoe ch
    else
        bash ${PREFIX}/bin/tmoe pr
    fi
}
##########
debian_main "$@"
```

`menu`

```sh
#!/usr/bin/env bash
#######################################
install_debian_gnu_linux_distro_menu() {
    RETURN_TO_WHERE='install_debian_gnu_linux_distro_menu'
    DOWNLOAD_PATH="/sdcard/Download/backup"
    DISTRO_NAME='debian'
    DEB_BOOT_STRAP=false
    LXC_IMAGES_REPO="https://mirrors.bfsu.edu.cn/lxc-images/images/${DISTRO_NAME}/"
    DISTRO_CODE=""
    install_debian_gnu_linux_distro_menu_zh() {
        BETA_SYSTEM=$(
            "${TUI_BIN:-whiptail}" --title "请选择您需要安装的debian version" --menu "bullseye为2021~2023年的stable版,sid永远都为unstable,sid的软件包较新" 0 50 0 \
                "1" "👦Sid(滚动更新,隔壁的男孩席德,玩具终结者)" \
                "2" "📕🐛12-bookworm(2023~2028,书虫--熊抱哥的手下)" \
                "3" "🐎11-bullseye(2021~2026,胡迪骑的马)" \
                "4" "🐶10-buster(2019~2024,安弟一家养的小狗)" \
                "5" "使用debootstrap手动构建" \
                "6" "Custom code手动输入版本代号" \
                "7" "🦕 13-trixie(2025~2030,小恐龙)" \
                "8" "自动检测debian-14(2027~2032)" \
                "0" "🌚 Return to previous menu 返回上级菜单" \
                3>&1 1>&2 2>&3
        )
    }
    install_debian_gnu_linux_distro_menu_ja() {
        BETA_SYSTEM=$(
            "${TUI_BIN:-whiptail}" --title "Debian version" --menu "Stable has fewer bugs,but the packages inside the \nsoftware source are older.Sid is relatively new." 0 50 0 \
                "1" "👦Sid不安定版:これは、開発者向けの版である" \
                "2" "📕🐛12-bookworm(2023~2028)" \
                "3" "🐎11-bullseye(2021~2026)" \
                "4" "🐶10-buster(2019~2024)" \
                "5" "debootstrapを使用して手動でビルドする" \
                "6" "カスタムコード" \
                "7" "🦕 13-trixie(2025~2030)" \
                "8" "debian-14(2027~2032)" \
                "0" "🌚 戻る" \
                3>&1 1>&2 2>&3
        )
    }
    # "5" "🐙9-stretch(2017~2022)" \
    install_debian_gnu_linux_distro_menu_en() {
        BETA_SYSTEM=$(
            "${TUI_BIN:-whiptail}" --title "Debian version" --menu "Stable has fewer bugs,but the packages inside the \nsoftware source are older.Sid is relatively new." 0 50 0 \
                "1" "👦Sid (Unstable,a rolling development version)" \
                "2" "📕🐛12-bookworm(2023~2028)" \
                "3" "🐎11-bullseye(2021~2026)" \
                "4" "🐶10-buster(2019~2024)" \
                "5" "Manually build" \
                "6" "Custom code" \
                "7" "🦕 13-trixie(2025~2030)" \
                "8" "debian-14(2027~2032)" \
                "0" "🌚 Return to previous menu" \
                3>&1 1>&2 2>&3
        )
    }
    ##############################
    case ${TMOE_MENU_LANG} in
    zh_*UTF-8) install_debian_gnu_linux_distro_menu_zh ;;
    ja_JP.UTF-8) install_debian_gnu_linux_distro_menu_ja ;;
    *) install_debian_gnu_linux_distro_menu_en ;;
    esac
    case "${BETA_SYSTEM}" in
    0 | "") choose_which_gnu_linux_distro ;;
    1) DISTRO_CODE='sid' ;;
    2) DISTRO_CODE='bookworm' ;;
    3) DISTRO_CODE='bullseye' ;;
    4) DISTRO_CODE='buster' ;;
    # 5) DISTRO_CODE='stretch' ;;
    5) debootstrap_debian_distro ;;
    6) custom_debian_version ;;
    7) check_debian_13 ;;
    8) check_debian_new_version ;;
    esac
    ######################
    TMOE_LINUX_CONTAINER_DISTRO="${DISTRO_NAME}-${DISTRO_CODE}"
    create_container_edition_txt
    go_to_proot_management
    ###############
    exit 0
}
#########################
check_debian_distro_code() {
    printf "%s\n" "即将为您安装Debian ${DISTRO_CODE} ${ARCH_TYPE} GNU/Linux container"
    do_you_want_to_continue
    case "${DISTRO_CODE}" in
    squeeze | wheezy | jessie | stretch | buster) install_debian_buster_via_tuna ;;
    sid) install_debian_sid_via_tuna ;;
    "") ;;
    *) install_debian_testing_via_tuna ;;
    esac
}
#------------------------
check_debian_13() {
    CURRENT_MONTH=$(date -u +%Y%m)
    if ((CURRENT_MONTH >= 202509)); then
        DISTRO_CODE='trixie'
    else
        DISTRO_CODE=$(curl -L ${LXC_IMAGES_REPO} | grep date | cut -d '=' -f 4 | cut -d '"' -f 2 | grep -Ev 'jessie|stretch|buster|bullseye|bookworm|sid|size' | tail -n 1)
        if [ -z "${DISTRO_CODE}" ]; then
            printf "%s\n" "检测到debian trixie尚未发布，建议您等到2025年时再来尝试"
            printf "%s\n" "如需体验最新版本，请安装debian sid，并添加experimental软件源"
            press_enter_to_return
            install_debian_gnu_linux_distro_menu
        fi
    fi
}
#############
debootstrap_debian_distro() {
    [[ $(command -v debootstrap) ]] || ${TMOE_INSTALLATION_COMMAND} debootstrap
    custom_debian_version
    printf "%s\n" "${DISTRO_CODE}"
    do_you_want_to_continue
    TMOE_LINUX_CONTAINER_DISTRO="${DISTRO_NAME}-${DISTRO_CODE}"
    #此处重复创建并非多余
    create_container_edition_txt
    if [ ! -e "${DEBIAN_CHROOT}" ]; then
        DEB_BOOT_STRAP=true
        printf "%s\n" "${DEBIAN_CHROOT}"
        link_debootstrap_script
        if ("${TUI_BIN:-whiptail}" --title "DEBIAN URL" --yes-button "BFSU MIRROR" --no-button "DEBIAN OFFICIAL" --yesno "Which url do you want to choose?" 8 50); then
            DEBIAN_MIRROR_URL="http://mirrors.bfsu.edu.cn/debian"
        else
            DEBIAN_MIRROR_URL="http://deb.debian.org/debian"
        fi

        ${TMOE_PREFIX} mkdir -pv ${DEBIAN_CHROOT}
        #whiptail,wget,dialog,apt-transport-https
        #debootstrap --no-check-gpg --foreign --arch ${ARCH_TYPE} ${DISTRO_CODE} ${DEBIAN_CHROOT} http://mirrors.huaweicloud.com/debian
        #--include=apt-utils,curl,ca-certificates,locales,locales-all
        #--include=ifupdown,init,iproute2,iputils-ping,isc-dhcp-client,locales,netbase,net-tools,procps,curl,ca-certificates,openssl,whiptail
        ${TMOE_PREFIX} debootstrap --no-check-gpg --arch ${ARCH_TYPE} --components=main,contrib,non-free --variant=minbase --include=init,locales,ca-certificates,openssl ${DISTRO_CODE} ${DEBIAN_CHROOT} ${DEBIAN_MIRROR_URL}
        if [[ ${DEBIAN_CHROOT} != / && -n ${DEBIAN_CHROOT} ]]; then
            ${TMOE_PREFIX} rm -fv ${DEBIAN_CHROOT}/dev/*
        fi
        printf "%s\n" "DEBOOTSTRAP_DIR=${DEBIAN_CHROOT}" >${CONFIG_FOLDER}/debootstrap_dir.txt
        #DEBIAN_FRONTEND=noninteractive DEBCONF_NONINTERACTIVE_SEEN=true LC_ALL=C LANGUAGE=C LANG=C && chroot ${DEBIAN_CHROOT} /debootstrap/debootstrap --second-stage
    fi
}
###########
custom_debian_version() {
    TARGET=$("${TUI_BIN:-whiptail}" --inputbox "请输入debian版本代号，例如buster(英文小写)\n Please type the debian version code." 10 50 --title "DEBIAN CODE" 3>&1 1>&2 2>&3)
    #[[ "$?" = 0 ]] || ${RETURN_TO_WHERE}
    DISTRO_CODE="$(printf '%s\n' "${TARGET}" | head -n 1 | cut -d ' ' -f 1)"
    if [ -z "${DISTRO_CODE}" ]; then
        printf "%s\n" "检测到您取消了操作"
        printf "%s\n" "已自动切换为debian11(代号bullseye)"
        DISTRO_CODE='bullseye'
    fi
}
#################
check_debian_new_version() {
    DISTRO_CODE=$(curl -L ${LXC_IMAGES_REPO} | grep date | cut -d '=' -f 4 | cut -d '"' -f 2 | grep -Ev 'jessie|stretch|buster|bullseye|bookworm|sid|trixie|size' | tail -n 1)
    if [ -z ${DISTRO_CODE} ]; then
        printf "%s\n" "检测到debian14尚未发布，建议您等到2027年时再来尝试"
        printf "%s\n" "如需体验最新版本，请安装debian sid，并添加experimental软件源"
        press_enter_to_return
        install_debian_gnu_linux_distro_menu
    fi
}
#####################################
install_debian_sid_via_tuna() {
    bash -c "$(sed -n p ${TMOE_SHARE_DIR}/container/install)"
}
#################
install_debian_buster_via_tuna() {
    bash -c "$(sed -n p ${TMOE_SHARE_DIR}/container/install |
        sed \
            -e "s@/sid@/${DISTRO_CODE}@g" \
            -e "s@-sid@-${DISTRO_CODE}@g" \
            -e "s@debian/ stable@debian/ ${DISTRO_CODE}@g" \
            -e "s@stable/updates@${DISTRO_CODE}/updates@g" \
            -e "s@buster-backports@${DISTRO_CODE}-backports@g" \
            -e 's@#deb http@deb http@g' \
            -e 's/.*sid main/#&/')"
}
############
install_debian_testing_via_tuna() {
    bash -c "$(sed -n p ${TMOE_SHARE_DIR}/container/install |
        sed \
            -e "s@/sid@/${DISTRO_CODE}@g" \
            -e "s@-sid@-${DISTRO_CODE}@g" \
            -e "s@debian/ stable@debian/ ${DISTRO_CODE}@g" \
            -e "s@stable/updates@${DISTRO_CODE}-security@g" \
            -e "s@buster-backports@${DISTRO_CODE}-backports@g" \
            -e 's@#deb http@deb http@g' \
            -e 's/.*sid main/#&/')"
}
#################
install_debian_gnu_linux_distro_menu $@
```

