var zzsjp_fsfpkj_spbm = function () {
    var maxRowIndex, nowRowIndex, maxZkRow, fskj, jplxhs, jplx;
    var qdbz;
    var w1, w2, w3, w4, w5, w6, w7, w8, w9;
    var hsbz;
    var defaultZbj, defaultYbj;
    var fpmx;
    var yfpdm, yfphm;
    var hzje, hzjeString, hzse, hzseFlag;
    var zsfs, blxx;
    return {
        //增加行
        addRow: function (p) {
            var _this = this;
            if (maxRowIndex + maxZkRow == (jplxhs - 1)) {
                disableButtons(_$("#xz"));
            }
            maxRowIndex++;
            var place = _$("#fyxms tr[placeholder]:first");
            var newLine = $(_this.newLine(maxRowIndex));
            if (place[0]) {
                place.before(newLine);
            } else {
                _$("#fyxms tr:not([placeholder]):last").after(newLine);
            }
            _$("#fyxms tr[placeholder]:last").remove();
            limit_money_input(_$("#spsl_" + maxRowIndex + ",#spdj_" + maxRowIndex
                + ",#je_" + maxRowIndex));
            if (p != "not_focus") {
                reFocus(_$("#spmc_" + maxRowIndex)[0]);
            }
            if (maxRowIndex == 1) {
                enableButtons(_$("#sc"));
                if (!fskj) {
                    enableButtons(_$("#zk"));
                }
            }
            quicklyChoiceSpbm(newLine, hsbz, "025", true, zsfs);
            //切换行
            newLine.find(":text:enabled,select").bind("focus", function () {
                var index = $(this).parents("tr:first").children("td:first");
                if (index.attr("rowselect") != "y") {
                    var other = $(this).parents("table").find("tr:not([zkh])").find("td:first");
                    other.attr("rowselect", "n").text(function () {
                        return $(this).attr("rowIndex")
                    });
                    index.attr("rowselect", "y").text("->");
                    nowRowIndex = index.attr("rowIndex");
                    if (index.attr("haszk") != "y") {
                        _this.toggleZK(false);
                    } else {
                        _this.toggleZK(true);
                    }
                }
            });

            //限制输入金额,计算金额
            newLine.find(":text[id^='spsl'],:text[id^='spdj']").bind("change", function () {
                var index = getIndex(this.id);
                var temp = Number(this.value.replace(/-/, "")).toFixed(3);
                temp = delRight(String(temp));
                var isdj = this.id.indexOf("dj") != -1;
                this.value = temp = isdj ? temp : fskj ? (-temp) : temp;
                this.value = this.value == 0 ? "" : this.value;
                var otherValue = isdj ? _$("#spsl_" + index).val() : _$("#spdj_" + index).val();
                if (temp != "" || otherValue != "") {
                    var plusJe = temp * otherValue;
                    if (jplx == "00" || jplx == "01" || jplx == "07") {
                        var spsl = _$("#spsl_" + index).val();
                        var spl = (spsl * 1).toFixed(2);
                        spl = delRight(String(spl.replace("-", "")));
                        var sl = (spl + "").replace(".", "");
                        if (sl.length > 6) {
                            alert("您输入的数量有误！请重新输入");
                            this.value = "";
                            return;
                        }
                        var spdj = _$("#spdj_" + index).val();
                        var spj = (spdj * 1).toFixed(2);
                        spj = delRight(String(spj.replace("-", "")));
                        var sp = (spj + "").replace(".", "");
                        if (sp.length > 7) {
                            alert("您输入的单价有误！请重新输入");
                            this.value = "";
                            return;
                        }
                        if (Math.abs(plusJe) > 99999.99) {
                            alert("单行金额超过当前版式最大值,请修正单价或数量");
                            this.value = "";
                            return;
                        }
                    } else if (jplx == "02" || jplx == "03" || jplx == "06" || jplx == "08") {
                        var spsl = _$("#spsl_" + index).val();
                        var spl = (spsl * 1).toFixed(2);
                        spl = delRight(String(spl.replace("-", "")));
                        var sl = (spl + "").replace(".", "");
                        if (sl.length > 7) {
                            alert("您输入的数量有误！请重新输入");
                            this.value = "";
                            return;
                        }
                        var spdj = _$("#spdj_" + index).val();
                        var spj = (spdj * 1).toFixed(2);
                        spj = delRight(String(spj.replace("-", "")));
                        var sp = (spj + "").replace(".", "");
                        if (sp.length > 9) {
                            alert("您输入的单价有误！请重新输入");
                            this.value = "";
                            return;
                        }
                        if (Math.abs(plusJe) > 9999999.99) {
                            alert("单行金额超过当前版式最大值,请修正单价或数量");
                            this.value = "";
                            return;
                        }
                    }
                    var result = (plusJe).toFixed(2);
                    _$("#je_" + index).val(result == 0 ? "" : result);
                }
                if (isdj) {
                    $(this).removeAttr("optDj");
                    _$("#hsbz_" + index).val(hsbz ? "y" : "n");
                }
                _this.reCountRow(index);
            });
            //计算单价或数量
            newLine.find(":text[id^='je']").bind("change", function () {
                this.value = (this.value.replace(/-/, "") * (fskj ? -1 : 1)).toFixed(2);
                if (this.value == 0) {
                    this.value = "";
                }
                //判断当前版式金额是否超过该版式最大值
                if (jplx == "00" || jplx == "01" || jplx == "07") {
                    if (this.value < -99999.99) {
                        alert("输入金额超过当前版式最大值，请检查！");
                        this.value = "";
                        return;
                    }
                } else if (jplx == "02" || jplx == "03" || jplx == "06" || jplx == "08") {
                    if (this.value < -9999999.99) {
                        alert("输入金额超过当前版式最大值，请检查！");
                        this.value = "";
                        return;
                    }
                }
                var index = getIndex(this.id);
                var spsl = _$("#spsl_" + index);
                var spdj = _$("#spdj_" + index);
                if (spsl.val() != "") {
                    spdj.val(delRight((this.value / spsl.val()).toFixed(3)));
                    if (jplx == "00" || jplx == "01" || jplx == "07") {
                        var spd = _$("#spdj_" + index).val();
                        var spj = (spd * 1).toFixed(2);
                        spj = delRight(String(spj.replace("-", "")));
                        var sp = (spj + "").replace(".", "");
                        if (sp.length > 7) {
                            alert("您输入的单价或金额有误！请重新输入");
                            spdj.val("");
                            return;
                        }
                    } else if (jplx == "02" || jplx == "03" || jplx == "06" || jplx == "08") {
                        var spd = _$("#spdj_" + index).val();
                        var spj = (spd * 1).toFixed(2);
                        spj = delRight(String(spj.replace("-", "")));
                        var sp = (spj + "").replace(".", "");
                        if (sp.length > 9) {
                            alert("您输入的单价或金额有误！请重新输入");
                            spdj.val("");
                            return;
                        }
                    }
                } else if (spdj.val() != "") {
                    spsl.val(delRight((this.value / spdj.val()).toFixed(3)));
                    if (jplx == "00" || jplx == "01" || jplx == "07") {
                        var sps = _$("#spsl_" + index).val();
                        var spl = (sps * 1).toFixed(2);
                        spl = delRight(String(spl.replace("-", "")));
                        var sl = (spl + "").replace(".", "");
                        if (sl.length > 6) {
                            alert("您输入的数量或金额有误！请重新输入");
                            spsl.val("");
                            return;
                        }
                    } else if (jplx == "02" || jplx == "03" || jplx == "06" || jplx == "08") {
                        var sps = _$("#spsl_" + index).val();
                        var spl = (sps * 1).toFixed(2);
                        spl = delRight(String(spl.replace("-", "")));
                        var sl = (spl + "").replace(".", "");
                        if (sl.length > 7) {
                            alert("您输入的数量或金额有误！请重新输入");
                            spsl.val("");
                            return;
                        }
                    }
                }
                _this.reCountRow(index);
            });
            //税率变化计算
            newLine.find("select[id^='sl']").bind("change", function () {
                var index = getIndex(this.id);
                _$("#spdj_" + index).removeAttr("optDj");
                if (_$("#je_" + index).val() == "") {
                    return;
                }
                _this.reCountRow(index);
            });
            //newLine.bind("dblclick",this.openFyxmDlg);
            newLine.bind("dblclick", this.spxx);
        },
        //打开商品编码dlg
        spxx: function () {
            var index = getIndex($(this).find("td:first").attr("rowindex"));
            tspz = "00";
            splxxx.spxx(index, hsbz, "025", true, blxx, jplx);
        },
        //打开费用项目dlg
        openFyxmDlg: function () {
            var url = ctxPath + "/zzp/selFyxm.do?targetType=dialog&index=";
            url += getIndex($(this).find("td:first").attr("rowindex"));
            url += "&hsbz=" + hsbz;
            $.pdialog.open(url, "zzp_selFyxm_dlg", "选择费用项目", {
                width: 560,
                height: 440
            })
        },
        //删除行
        delRow: function () {
            var _this = this;
            var td = _$("#row_" + maxRowIndex);
            if (td.attr("haszk") == "y") {
                alert("该行已添加折扣信息，请先删除此行的折扣信息！");
                reFocus(_$("#spmc_" + maxRowIndex)[0]);
                return;
            }
            if (maxRowIndex < (jplxhs + 1)) {
                enableButtons(_$("#xz"));
                _$("#fyxms").append(_this.newPlaceHolder());
                if (maxRowIndex == 1) {
                    disableButtons(_$("#sc,#zk"));
                }
            }
            $(td.parent().remove());
            this.reCountHjje();
            maxRowIndex--;
            reFocus(_$("#spmc_" + maxRowIndex)[0]);
        },
        //添加一行
        newLine: function (index) {
            return "<tr><td id='row_"
                + index + "' style='border-right:none;width:" + w1 + "px;'" + " rowIndex='" + index + "'>" + index
                + "</td><td style='width:" + w2 + "px;border-right:1px solid green;'><input id='spmc_"
                + index + "' name='spmc_" + index
                + "' maxlength='20' style='width:192px;' /></td><td style='width:" + w5 + "px;border-right:1px solid green;'><input id='spsl_"
                + index + "' name='spsl_" + index
                + "' style='text-align:right;width:90px;' maxlength='12'/></td><td style='width:" + w6 + "px;border-right:1px solid green;'><input id='spdj_"
                + index + "' name='spdj_" + index
                + "' style='text-align:right;width:112px;' maxlength='12'/></td><td style='width:" + w7 + "px;border-right:1px solid green;'><input id='je_"
                + index + "' name='je_" + index
                + "' style='text-align:right;width:140px;' maxlength='12'/></td><td style='width:" + w8 + "px;border-right:1px solid green;'><select id='sl_"
                + index + "' name='sl_" + index
                + "' style='height:18px;width:66px;'>" + this.szsmStr + "</select></td>"
                + "<td style='width:" + w9 + "px;text-align:right;'><input id='se_" + index
                + "' style='text-align:right;width:104px;' disabled='disabled'/>" +
                "<input id='hsbz_" + index + "' name='hsbz_" + index + "' " + "value='" + (hsbz ? "y" : "n") + "' type='hidden'/>" +
                "<input id='spbm_" + index + "' name='spbm_" + index + "' " + "value='' type='hidden'/>" +
                "</td></tr>"
        },
        //计算行
        reCountRow: function (index) {
            var sl = _$("#sl_" + index).val() * 1;
            var dj = _$("#spdj_" + index).val();
            var spsl = _$("#spsl_" + index).val();
            var je = _$("#je_" + index).val();
            if (hsbz) {

                _$("#se_" + index).val((je * sl / (1 + sl)).toFixed(2));

            } else {

                _$("#se_" + index).val((je * sl).toFixed(2));

            }
            this.reCountHjje();
        },
        //计算合计金额
        reCountHjje: function () {
            var hjje = 0, se = 0, jshj = 0;
            _$("#fyxms :text[id^='je']").each(function () {
                hjje += $(this).val() * 1;
            });
            _$("#fyxms :text[id^='se']").each(function () {
                se += $(this).val() * 1;
            });
            hjje += _$("#hjzkje").text() * 1;
            se += _$("#hjzkse").text() * 1;
            if (hsbz) {
                jshj = hjje.toFixed(2);
                hjje = jshj - se;
            } else {
                jshj = (hjje + se).toFixed(2);
            }
            _$("#jshj").text("￥" + jshj);
            _$("#hjje").text("￥" + hjje.toFixed(2));
            _$("#hjse").text("￥" + se.toFixed(2));
            _$("#jshjdx").text(je2Upper(jshj));
        },


        //打开添加折扣弹出框
        addZk: function () {
            var _this = this;
            var index = nowRowIndex;
            var td = _$("#row_" + index);
            //删除折扣
            if ("y" == td.attr("haszk")) {
                if (confirm("是否删除当前 " + td.attr("zkhs") + " 行的折扣信息？")) {
                    var tr = td.parent().next();
                    while (tr.attr("zkh") != "y") {
                        tr = tr.next();
                    }
                    var lastRow = tr.prev();
                    tr.remove();
                    var zkhs = td.attr("zkhs");
                    for (var i = 0; i < zkhs; i++) {
                        lastRow.children("td:first").removeAttr("zkhs").css("background-color", "").attr("haszk", "n");
                        lastRow.find("td :text").removeAttr("readonly");
                        lastRow.find("td select").removeAttr("disabled");
                        //lastRow.bind("dblclick",this.openFyxmDlg);
                        lastRow.bind("dblclick", this.spxx);
                        lastRow = lastRow.prev();
                    }
                    this.reCountZkje();
                    reFocus(td.next().children()[0]);
                    this.toggleZK(false);
                    maxZkRow--;
                    if (maxRowIndex + maxZkRow < jplxhs) {
                        enableButtons(_$("#xz"));
                    }
                }
                return;
            }
            if (maxRowIndex + maxZkRow == jplxhs) {
                alert("已到最大行数，无法继续新增费用项目折扣。");
                return;
            }
            //计算可以折扣几行
            var selectRowSl = _$("#sl_" + index).val();
            var canZk = 0;
            for (var i = index; i > 0; i--) {
                if (_$("#row_" + i).attr("haszk") != "y" && _$("#sl_" + i).val() == selectRowSl) {
                    var spmc = _$("#spmc_" + i);
                    var je = _$("#je_" + i);
                    if (spmc.val() == "" || je.val() == "") {
                        alert("填写折扣前必须先填写商品名称和金额！");
                        reFocus(spmc.val() == "" ? spmc[0] : je[0]);
                        return;
                    }
                    canZk++;
                } else {
                    break;
                }
            }
            //判断折扣行数
            canZk = Math.min(canZk, jplxhs - (maxRowIndex + maxZkRow));
            $.pdialog.open(ctxPath + "/zzsjp_fs_spbm/addZk.do", "zzsjp_addZk_dlg", "添加折扣", {
                width: 450,
                height: 240,
                callback: function () {
                    $("#zkhs").empty();
                    for (var i = 1; i <= canZk; i++) {
                        $("#zkhs").append("<option value='" + i + "'>" + i + "</option>");
                    }
                    $("#spyje").text(_$("#je_" + index).val());
                    $("#spyse").val(_$("#se_" + index).val());
                    $("#zkl").focus();
                    $("#dlg_save_bt").click(function () {
                        _this.checkAddZK();
                    });
                    //折扣计算
                    $("#zkl").keyup(function () {
                        $("#zkje").val(($("#spyje").text() * this.value / 100).toFixed(2));
                    }).each(function (i) {
                        limit_money_input(this);
                    });
                    $("#zkje").keyup(function () {
                        $("#zkl").val((100 * this.value / $("#spyje").text()).toFixed(6));
                    }).each(function (i) {
                        limit_money_input(this);
                    });
                    //折扣计算
                    $("#zkhs").change(function () {
                        var zkhs = this.value;
                        var zje = 0;
                        var zse = 0;
                        for (var i = 0; i < zkhs; i++) {
                            zje += _$("#je_" + (nowRowIndex - i)).val() * 1;
                            zse += _$("#se_" + (nowRowIndex - i)).val() * 1;
                        }
                        $("#spyje").text(zje.toFixed(2));
                        $("#spyse").val(zse.toFixed(2));
                        if ($("#zkl").val() != "") {
                            $("#zkje").val(($("#spyje").text() * $("#zkl").val() / 100).toFixed(2));
                        }
                    });
                }
            });
        },
        //添加折扣
        checkAddZK: function () {
            var zkl = $("#zkl");
            var zkje = $("#zkje");
            var spyje = $("#spyje");
            var zkjeval = Number(zkje.val() * -1).toFixed(2);
            var zkjevalBj = 0;//折扣金额比较值，用于和zkjeval相比，多退少补
            if (zkje.val() == "" || zkl.val() == "" || zkjeval == 0 || (maxRowIndex > 1 ? (Math.abs(zkjeval) > spyje.text()) : (Math.abs(zkjeval) >= spyje.text()))) {
                alert("折扣金额或折扣率填写错误！");
                reFocus($("#zkl")[0])
            } else {
                var index = nowRowIndex;
                var zkhs = $("#zkhs").val();
                var zkslval = _$("#sl_" + index).val();
                for (var i = 0; i < zkhs; i++) {
                    var preZkjeval = (zkhs == 1 ? zkjeval : (-_$("#je_" + index).val() * zkl.val() / 100).toFixed(2));
                    if (preZkjeval == 0) {
                        preZkjeval = "0.00";
                    }
                    zkjevalBj = zkjevalBj + preZkjeval * 1;
                    if (zkhs == i + 1 && zkjevalBj.toFixed(2) != zkjeval) {
                        preZkjeval = (preZkjeval * 1 + (zkjeval - zkjevalBj.toFixed(2))).toFixed(2);
                    }
                    var zkseval = hsbz ? (preZkjeval - preZkjeval / (1 + zkslval * 1)).toFixed(2) : (preZkjeval * zkslval).toFixed(2);
                    if (zkseval == 0) {
                        zkseval = "0.00";
                    }
                    var td = _$("#row_" + index);
                    var tr = td.parent();
                    td.attr("haszk", "y").attr("zkhs", 1).css("background-color", "orange");
                    tr.after("<tr zkh='y' index='" + index + "' style='color:red;text-align:right'>" +
                        "<td width='15' style=''/>" +
                        "<td width='151' style='text-align:left;border-right: 1px solid green;' id='zknr_" + index + "'>" + _$("#spmc_" + index).val() + "</td>" +
                        "<td width='84' style='border-right: 1px solid green;'/><td width='30' style='border-right: 1px solid green;'/>" +
                        "<td width='56' style='border-right: 1px solid green;'/><td width='56' style='border-right: 1px solid green;'/>" +
                        "<td width='98' style='text-align:right;border-right: 1px solid green;' id='zkje_" + index + "'>" +
                        preZkjeval + "</td>" +
                        "<td width='52' style='text-align:right;border-right: 1px solid green;' id='zksl_" + index + "'>" + (zkslval * 100) +
                        "<span style='margin-right:5px;'>%</span></td>" +
                        "<td style='text-align:right;' id='zkse_" + index + "'>" + zkseval + "</td></tr>");
                    //去除双击事件
                    tr.unbind("dblclick");
                    tr.find("td :text").attr("readonly", "readonly");
                    tr.find("td select").attr("disabled", "disabled");
                    index--;
                    maxZkRow++;
                }
                if (maxRowIndex + maxZkRow == jplxhs) {
                    //alert("已到最大行数，无法继续新增费用项目。");
                    disableButtons(_$("#xz"));
                }
                //重新获取焦点
                reFocus(_$("#spmc_" + index)[0]);
                this.toggleZK(true);
                this.reCountZkje();
                $.pdialog.closeCurrent();
            }
        },
        //打开负数弹出框
        openFskjDlg: function () {
            var _this = this;
            $.pdialog.open(ctxPath + "/zzsjp_fs_spbm/fskjDlg.do", "zzsjp_fskjDlg_dlg", "销项负数发票代码号码填写、确认", {
                width: 480,
                height: 245,
                callback: function () {
                    $("#dlg_next_bt").click(function () {
                        //校验信息表
                        if (_this.jyxxb()) {
                            //整理开具负数需要的状态
                            _this.preFskj();
                        } else {
                            return;
                        }
                        ajaxLoad(ctxPath + "/zzsjp_fs_spbm/searchYfp.do", {
                            yfpdm: yfpdm,
                            yfphm: yfphm
                        }, function (json) {
                            if (json.errMessage) {
                                alert(json.errMessage);
                                disableButtons(_$("#xz,#sc,#jg,#kj,#fs"));
                                return;
                            }
                            if (json.rightMessage) {
                                alert(json.rightMessage);
                            }
                            hzje = json.hzje;
                            hzjeString = json.hzjeString;
                            hzse = json.hzse;
                            hzseFlag = json.hzseFlag;
                            _this.setValueFromYfp(json.yfpmx, json.sfyyfp);
                        });
                    });
                }
            });
        },
        //校验信息表
        jyxxb: function () {
            yfpdm = $("#yfpdm").val();
            yfphm = $("#yfphm").val();
            var rfpdm = $("#rfpdm").val();
            var rfphm = $("#rfphm").val();
            if (yfpdm == "" || yfphm == "") {
                alert("请输入销项正数发票代码、号码");
                return false;
            }
            if (rfpdm == "" || rfphm == "") {
                alert("请输入确认正数发票代码、号码");
                return false;
            }
            //校验输入
            if (!/\d{12}/.test(yfpdm) || /^0+$/.test(yfpdm)) {
                alert("销项正数发票代码填写有误！");
                return false;
            } else if (!/\d{8}/.test(yfphm) || /^0+$/.test(yfphm)) {
                alert("销项正数发票号码填写有误！");
                return false;
            }
            //校验输入
            if (!/\d{10}/.test(rfpdm)) {
                alert("确认正数发票代码填写有误！");
                return false;
            } else if (!/\d{8}/.test(rfphm)) {
                alert("确认正数发票号码填写有误！");
                return false;
            }
            if (yfpdm == rfpdm && yfphm == rfphm) {
                return true;
            } else {
                alert("发票代码、发票号码两次录入不一致，请重新录入！！");
                return false;
            }
        },
        //整理开具负数需要的状态
        preFskj: function () {
            enableButtons(_$("#kj"));
            $.pdialog.closeCurrent();
            _$("#fswz").show();
            var fyxm_table = _$("#fyxms");
            fyxm_table.empty();
            for (var index = 1; index <= 6; index++) {
                fyxm_table.append(this.newPlaceHolder());
            }
            maxRowIndex = 0, nowRowIndex = 0, maxZkRow = 0;
            _$("#jshjdx").before("");
            _$("#spmctitle").text("货物或应税劳务名称");
            qdbz = false;
            fskj = true;
        },
        //回填
        setValueFromYfp: function (yfp, sfyyfp) {
            var _this = this;
            //删除当前存在的子项		
            for (var i = 1; i <= maxRowIndex; i++) {
                _this.delRow();
            }
            if (sfyyfp == true) {

                //开始回填票面项目
                _$("#ghdwmc").val(yfp.ghdwmc);
                if (yfp.ghdwdm != "00000000000000000000") {
                    _$("#ghdwdm").val(yfp.ghdwdm);
                }
                _$("#xhdwmc").text(yfp.xhdwmc);
                _$("#xhdwdm").text(yfp.xhdwdm);
                _$("#skr").val(yfp.skr);
                _$("#kpr").val(yfp.kpr);
                _$("#jshj").text((-yfp.jshj).toFixed(2));
                _$("#jshjdx").text(je2Upper(yfp.jshj));
                _$("#hjje").text((-yfp.hjje).toFixed(2));
                _$("#hjse").text((yfp.se == 0 ? 0 : -yfp.se).toFixed(2));
                if (_$("#bzBefore")) {
                    _$("#bzBefore").remove();
                }
                //_$("#bz").before("<span id='bzBefore' name='bzBefore' style='color:red;float: left;'>"+ "对应正数发票代码:"+yfp.fpdm+"号码:"+yfp.fphm + "</span>").attr("rows","3");
                //_$("#bz").val(yfp.bz);
                //多税率

                //子表
                var mxzb = yfp.mxzb;
                for (var i = 1; i <= mxzb.length; i++) {
                    _this.addRow();
                    _$("#spmc_" + i).val(mxzb[i - 1].spmc);
                    _$("#spsl_" + i).val(mxzb[i - 1].spsl ? delRight((-mxzb[i - 1].spsl).toFixed(6)) : "");
                    _$("#spdj_" + i).val(mxzb[i - 1].hsdj ? delRight(mxzb[i - 1].hsdj.toFixed(6)) : "");
                    _$("#je_" + i).val((-mxzb[i - 1].hsje).toFixed(2));
                    var sl = yfp.zhsl == 99.01 && yfp.qdbz == 1 ? "" : (mxzb[i - 1].sl == 0 ? "0" : (mxzb[i - 1].sl + "").length > 4 && (mxzb[i - 1].sl + "").substring(4, 5) * 1 > 0 ? mxzb[i - 1].sl.toFixed(3) : mxzb[i - 1].sl.toFixed(2));
                    var currentszsm = _this.szsmStr;
                    if (currentszsm.indexOf(sl) < 0) {
                        currentszsm += ("<option value='" + sl + "'>" + sl * 100 + "%</option>");
                    }
                    _$("#sl_" + i).html(sortSl(currentszsm));
                    _$("#sl_" + i).val(sl);
                    _$("#se_" + i).val(mxzb[i - 1].se ? (-mxzb[i - 1].se).toFixed(2) : "0.00");
                    _$("#spbm_" + i).val(mxzb[i - 1].spbm + mxzb[i - 1].zxbm);
                }
            } else {
                for (var i = 1; i <= maxRowIndex; i++) {
                    _this.delRow();
                }
                disableButtons(_$("#sc"));
                enableButtons(_$("#xz"));
                //开始回填票面项目
                _$("#ghdwmc").val("");
                _$("#ghdwdm").val("");
                _$("#jshj").text("0.00");
                _$("#jshjdx").text(je2Upper(0));
                _$("#hjje").text("0.00");
                _$("#hjse").text("0.00");
                if (_$("#bzBefore")) {
                    _$("#bzBefore").remove();
                    _$("#bz").attr("rows", "5");
                }
                if (yfp) {
                    _$("#bz").before("<span id='bzBefore' name='bzBefore' style='color:red;float: left;'>" + "对应正数发票代码:" + yfp.fpdm + "号码:" + yfp.fphm + "</span>").attr("rows", "3");
                }
            }
            this.reCountHjje();

        },
        //添加占位行
        newPlaceHolder: function () {
            var str = "<tr placeholder='y'>" +
                "<td style='width:" + w1 + "px;'></td>" +
                "<td style='width:" + w2 + "px;border-right:1px solid green;'></td>" +
                "<td style='width:" + w5 + "px;border-right:1px solid green;'></td>" +
                "<td style='width:" + w6 + "px;border-right:1px solid green;'></td>" +
                "<td style='width:" + w7 + "px;border-right:1px solid green;'></td>" +
                "<td style='width:" + w8 + "px;border-right:1px solid green;'></td>" +
                "<td style='width:" + w9 + "px;text-align:right;'><input disabled='disabled' style='width:10px;visibility: hidden;'/></td></tr>";
            return str;
        },
        //切换折扣状态
        toggleZK: function (a) {
            if (a) {
                _$('#zk').text('删除折扣')
            } else {
                _$('#zk').text('新增折扣')
            }
        },
        //计算合计折扣金额
        reCountZkje: function () {
            var zkzje = 0;
            var zkzse = 0;
            _$("#fyxms tr[zkh] td[id^='zkje']").each(function () {
                zkzje += $(this).text() * 1;
            });
            _$("#fyxms tr[zkh] td[id^='zkse']").each(function () {
                zkzse += $(this).text() * 1;
            });
            _$("#hjzkje").text(zkzje.toFixed(2));
            _$("#hjzkse").text(zkzse.toFixed(2));
            this.reCountHjje();
        },
        //开具校验
        validateFsfp: function () {
            _$(".fp-content-center :text:not(:disabled),textarea").val(function () {
                return $.trim(this.value);
            });
            if (maxRowIndex == 0) {
                alert("请添加费用项目");
                this.addRow();
                return false;
            }
            var ghdwmc = _$("#ghdwmc")[0];
            if (ghdwmc.value == "") {
                alert("购货单位名称不能为空");
                reFocus(ghdwmc);
                return false;
            } else if (countStrLength(ghdwmc.value) > 80) {
                alert("购货单位名称最多为80个字符或40个汉字");
                reFocus(ghdwmc);
                return false;
            }
            var ghdwdm = _$("#ghdwdm")[0];
            var regex = /^[A-Z0-9]{7,20}$/;
            /*if(ghdwdm.value==""){
             alert("购货单位识别号不能为空");
             reFocus(ghdwdm)
             return false;
             }else */
            if (ghdwdm.value != "" && !regex.test(ghdwdm.value)) {
                alert("购货单位识别号为(7-20位)数字或大写字母");
                reFocus(ghdwdm);
                return false;
            }
            if (ghdwdm.value != "" && ghdwdm.value * 1 == 0) {
                alert("购货单位识别号不能全为0！");
                reFocus(ghdwdm);
                return false;
            }
            var bz = _$("#bz")[0];
            if (bz.value.indexOf("?") != -1) {
                alert("备注中非法字符?禁止输入");
                reFocus(bz);
                return false;
            } else if (countStrLength(bz.value) > 120) {
                alert("备注最多为120个字符或60个汉字");
                reFocus(bz);
                return false;
            }
            var bzlength = countStrLength(bz.value);
            // if (jplx == "07") {
            //     if ((maxRowIndex + maxZkRow == jplxhs) && countStrLength(bz.value) > 0) {
            //         alert("当前版式发票输入备注时明细项目最多行数为6行！");
            //         return false;
            //     }
            // }
            // if (jplx == "06") {
            //     if ((maxRowIndex + maxZkRow == jplxhs) && countStrLength(bz.value) > 0) {
            //         alert("当前版式发票输入备注时明细项目最多行数为12行！");
            //         return false;
            //     }
            // }
            for (var i = 0; i < bz.value.length; i++) {
                if (bz.value.indexOf("\n", i) < 0) {
                    break;
                } else {
                    if (!confirm("备注信息换行次数过多，可能无法正常显示，请确认\n是否保留这些换行！如确认保留，请点击确定继续。")) {
                        return false;
                    }
                    break;
                }
            }
            var skr = _$("#skr")[0];
            if (countStrLength(skr.value) > 20) {
                alert("收款人最多为20个字符或10个汉字");
                reFocus(skr);
                return false;
            } else {
                $.cookie("jpskr", _$("#skr").val(), {path: "/", expires: 100000});
            }
            var kpr = _$("#kpr")[0];
            if (countStrLength(kpr.value) > 20) {
                alert("开票人最多为20个字符或10个汉字");
                reFocus(kpr);
                return false;
            }
            if (countStrLength(kpr.value) == 0) {
                alert("开票人不允许为空！");
                reFocus(kpr);
                return false;
            }
            var spmcs = _$("#fyxms :text[id^='spmc']");
            var zhzs = 0;//总行数（含折扣行）
            var maxHs;
            if(jplx == "06"){
                maxHs = bzlength > 0 ? (jplxhs - 2) : jplxhs;
            }else if(jplx == "07"){
                maxHs = bzlength > 0 ? (jplxhs - 3) : jplxhs;
            }
            for (var i = 0; i < spmcs.length; i++) {
                var spmc = spmcs[i];
                var index = getIndex(spmc.id);
                var ggxh = _$("#ggxh_" + index)[0];
                var dw = _$("#dw_" + index)[0];
                var je = _$("#je_" + index)[0];
                if (spmc.value == "") {
                    alert("货物或应税劳务名称不能为空");
                    reFocus(spmc);
                    return false;
                } else if (jplx == "06"||jplx == "07") {
                    if (countStrLength(spmc.value) > 100) {
                        alert("货物或应税劳务名称最多为100个字符或50个汉字");
                        reFocus(spmc);
                        return false;
                    }
                }
                var haszk = _$(spmc).parents("tr").find("td:first").attr("haszk");
                if (jplx == "06") {
                    zhzs += (haszk == "y") ? (Math.ceil(spmclength / 14) * 2) : (Math.ceil(spmclength / 14));
                    if (zhzs > maxHs) {
                        alert("货物或应税劳务名称（项目）字数打印时所占行数已超过" + maxHs + "行的最大票面限制，无法打印完全，请检查！");
                        reFocus(spmc);
                        return false;
                    }
                } else if (jplx == "07") {
                    zhzs += (haszk == "y") ? (Math.ceil(spmclength / 10) * 2) : (Math.ceil(spmclength / 10));
                    if (zhzs > maxHs) {
                        alert("货物或应税劳务名称（项目）字数打印时所占行数已超过" + maxHs + "行的最大票面限制，无法打印完全，请检查！");
                        reFocus(spmc);
                        return false;
                    }

                } else if (jplx == "08") {
                    if (countStrLength(spmc.value) > 24) {
                        alert("货物或应税劳务名称最多为24个字符或12个汉字");
                        reFocus(spmc);
                        return false;
                    }
                    var spmclength = countStrLength(spmc.value);
                    if (spmclength > 0 && spmclength <= 12) {
                        haszk == "y" ? (zhzs += 2) : (zhzs++);
                    } else if (spmclength > 12 && spmclength <= 24) {
                        haszk == "y" ? (zhzs += 4) : (zhzs += 2);
                    }
                    if (zhzs > jplxhs) {
                        alert("货物或应税劳务名称（项目）字数打印时所占行数已超过8行的最大票面限制，无法打印完全，请检查！");
                        reFocus(spmc);
                        return false;
                    }
                }
                if (je.value == "") {
                    alert("金额不能为空");
                    reFocus(je);
                    return false;
                }
            }
            //判断当前版式价税合计是否超过该版式最大值
            var jshj = _$("#jshj").text();
            var js = (jshj + "").replace("￥", "");
            if (jplx == "00" || jplx == "01" || jplx == "07") {
                if (js < -99999.99) {
                    alert("价税合计超过当前版式最大值，请检查！");
                    return false;
                }
            } else if (jplx == "02" || jplx == "03" || jplx == "06" || jplx == "08") {
                if (js < -9999999.99) {
                    alert("价税合计超过当前版式最大值，请检查！");
                    return false;
                }
            }
            return true;
        },
        //开具前生成其他辅助输入项
        addExtraInfo: function () {
            _$("#extraDiv").remove();
            var extraDiv = $("<div id='extraDiv'/>").hide();
            _$("#zzsjp_fsfpkj_spbm_form").append(extraDiv);
            extraDiv.append("<input name='hjzkje' value='" + _$("#hjzkje").text() + "'/>");
            extraDiv.append("<input name='hjzkse' value='" + _$("#hjzkse").text() + "'/>");
            extraDiv.append("<input name='hjje' value='" + delLeftMoney(_$("#hjje").text()) + "'/>");
            extraDiv.append("<input name='hjse' value='" + delLeftMoney(_$("#hjse").text()) + "'/>");
            extraDiv.append("<input name='jshj' value='" + delLeftMoney(_$("#jshj").text()) + "'/>");
            extraDiv.append("<input name='sfhs' value='" + (hsbz ? "y" : "n") + "'/>");
            extraDiv.append("<input name='qdbz' value='" + (qdbz ? "y" : "n") + "'/>");
            extraDiv.append("<input name='yfpdm' value='" + yfpdm + "'/>");
            extraDiv.append("<input name='yfphm' value='" + yfphm + "'/>");
            extraDiv.append("<input name='hzje' value='" + hzje + "'/>");
            extraDiv.append("<input name='hzjeString' value='" + hzjeString + "'/>");
            extraDiv.append("<input name='hzse' value='" + hzse + "'/>");
            extraDiv.append("<input name='hzseFlag' value='" + (hzseFlag ? "y" : "n") + "'/>");
            //判断是否统一税率
            var slArray = _$("#fyxms select[id^=sl]").get();
            var isAll = true;
            for (var i = 1; i < slArray.length; i++) {
                var index = getIndex(slArray[i].id);
                if (slArray[i].value != slArray[0].value) {
                    isAll = false;
                    break;
                }
            }
            if (isAll) {
                extraDiv.append("<input name='allSL' value='" + slArray[0].value + "'/>")
            }
            //追加禁用的税率select
            _$("#fyxms select:disabled[id^=sl]").each(function () {
                extraDiv.append("<input name='" + this.name + "' value='" + this.value + "'/>");
            });
            //追加税额
            _$("#fyxms :text[id^='se']").each(function () {
                //追加折扣标志
                var index = getIndex(this.id);
                var td = _$("#row_" + index);
                extraDiv.append("<input name='zkbz_" + index + "' value='" + (td.attr("haszk") == "y" ? "y" : "n") + "'/>");
                extraDiv.append("<input name='" + this.id + "' value='" + this.value + "'/>");
            });
            var bhshjzkje = 0;
            if (!fskj) {
                //追加折扣行
                _$("#fyxms tr[zkh]").each(function () {
                    var index = $(this).attr("index");
                    var zknr = _$("#zknr_" + index).text();
                    var zkje = _$("#zkje_" + index).text();
                    var zksl = delRightPercent(_$("#zksl_" + index).text()) / 100;
                    var zkse = _$("#zkse_" + index).text();
                    //含税时传不含税折扣金额
                    if (hsbz) {
                        zkje = (zkje - zkse).toFixed(2);
                        bhshjzkje += zkje * 1;
                    }
                    extraDiv.append("<input name='zknr_" + index + "' value='" + zknr + "'/>")
                        .append("<input name='zkje_" + index + "' value='" + zkje + "'/>")
                        .append("<input name='zksl_" + index + "' value='" + zksl + "'/>")
                        .append("<input name='zkse_" + index + "' value='" + zkse + "'/>");
                });
                //追加含税时的不含税折扣总金额
                if (hsbz) {
                    extraDiv.append("<input name='bhshjzkje' value='" + bhshjzkje.toFixed(2) + "'/>");
                }
            } else {
                //添加负数开具状态
                extraDiv.append("<input name='fskj' value='1'/>")
            }
            //转换含税金额、单价
            if (hsbz) {
                _$("#fyxms :text[id^='je']").each(function () {
                    var index = getIndex(this.id);
                    var bhsje = _$("#je_" + index).val() - _$("#se_" + index).val();
                    extraDiv.append("<input name='bhsje_" + index + "' value='" + bhsje.toFixed(2) + "'/>");
                });
                _$("#fyxms :text[id^=spdj]").each(function () {
                    var realDj = this.value, index = getIndex(this.id);
                    if (realDj != "") {
                        if ($(this).attr("optDj")) {
                            realDj = $(this).attr("optDj");
                        } else {
                            realDj = delRight((this.value / (1 + _$("#sl_" + index).val() * 1)).toFixed(6))
                        }
                    }
                    extraDiv.append("<input name='realdj_" + index + "' value='" + realDj + "'/>");
                })
            }
        },
        kjcg: function (json) {
            navTabAjaxDone(json);
            if (json.statusCode == DWZ.statusCode.ok) {
                for(var i=0;i<=maxRowIndex;i++){
                    _$("#row_"+i).parent().unbind("dblclick");
                }
                disableButtons(_$("#xz,#sc,#jg,#kj,#fs,#cezs"));
                _$("#yl,#dy,#xyz").parent().parent().show();
                _$('.fp-content-center :text,.fp-content-center select,.fp-content-center textarea').attr('disabled', 'disabled');
                _$("#fpdm").text(json.kjjg.fpdm);
                _$("#fphm").text(json.kjjg.fphm);
                var kprq = json.kjjg.kprq;
                _$("#kprq").text(kprq.substring(0, 4) + "年" + kprq.substring(4, 6) + "月" + kprq.substring(6, 8) + "日");
                var skm = json.kjjg.skm;
                for (var i = 1; i <= 4; i++) {
                    _$("#skm").append($("<span style='font-size:14px;font-family: Courier New;'/>").text(skm.substring(i * 28 - 28, i * 28))).append("<br/>");
                }
                var jym = json.kjjg.jym;
                _$("#jym").text(jym);
                fpmx = json.kjjg;
                fpmx.ewm = json.ewm;
                if (_$("#ghdwdm").val() != null && _$("#ghdwdm").val() != "") {
                    var param = {
                        nsrmc: _$("#ghdwmc").val(),
                        nsrsbh: _$("#ghdwdm").val(),
                        dzdh: _$("#ghdwdzdh").val(),
                        yhzh: _$("#ghdwyhzh").val(),
                        global:false
                    };
                    ajaxLoad(ctxPath + "/zzp/updateBuyerInfo.do", param);
                }
            }
        },
        //单价数量根据版式不一样位数校验
//		djslJy:function(){
//			var djslFlag = true;
//			var djRows = "";
//			var slRows = "";
//			_$("#fyxms :text[id^=spdj]").each(function(){
//				var spdj=this.value;
//				var index = getIndex(this.id);
//				var djj=(spdj*1).toFixed(2);
//				djj = delRight(new String(djj));
//				var dj=(djj+"").replace(".","");
//				if(jplx=="00"||jplx=="01"){
//					if(dj.length>8){
//						djRows = djRows + index + "、";
//					}
//				 }else
//				if(jplx=="02"||jplx=="03"){
//					if(dj.length>10){
//						djRows = djRows + index + "、";
//					}
//				 }
//			});
//			_$("#fyxms :text[id^=spsl]").each(function(){
//				var spsl=this.value;
//				var index = getIndex(this.id);
//				var sll=(spsl*1).toFixed(2);
//				sll = delRight(new String(sll));
//				var sl=(sll+"").replace(".","");
//				if(jplx=="00"||jplx=="01"){
//					if(sl.length>6){
//					slRows = slRows + index + "、";
//					}
//				}else
//				if(jplx=="02"||jplx=="03"){
//					if(sl.length>7){
//					slRows = slRows + index + "、";
//					}
//				}
//			});
//			if(!(djRows=="" && slRows=="")){
//				djslFlag = false;
//				if(confirm((djRows!=""?("第"+djRows.substring(0,djRows.length-1)+"行单价 "):"")+(slRows!=""?("第"+slRows.substring(0,slRows.length-1)+"行数量"):"")+"长度超过规定位数，打印时会被隐藏，影响打印效果，您确定要继续开具吗？")) {
//					djslFlag = true;
//				}
//			}
//			return djslFlag;
//		},
        initbjFromCookie: function () {
            var _this = this;
            $.pdialog.open(ctxPath + "/zzp/tzbj.do", "zzsjp_tzbj_dlg", "调整边距", {
                width: 480,
                height: 200,
                callback: function () {
                    $("#dlg_print_bt").bind("click", _this.printfp);
                    $("#dlg_printA_bt").bind("click", _this.printfpA);
                    var zbj = $.cookie("zbj_zzsp");
                    if (!zbj) {
                        zbj = defaultZbj;
                    }
                    var ybj = $.cookie("ybj_zzsp");
                    if (!ybj) {
                        ybj = defaultYbj;
                    }
                    $("#zbj").val(zbj);
                    $("#ybj").val(ybj);
                }
            });
        },
        printfp: function () {
            disableButtons(_$("#dy,#yl"));
            zzsjp_fsfpkj_spbm.initPrintData();
            $.cookie("dyfs") == "1" ? LODOP.PRINTA() : LODOP.PRINT();
        },
        initYLData: function () {
            zzsjp_fsfpkj_spbm.initPrintData(true);
            LODOP.SET_PREVIEW_WINDOW(1, 0, 0, 890, 700, "");
            LODOP.SET_SHOW_MODE("HIDE_PBUTTIN_PREVIEW", 1);
            LODOP.PREVIEW();
        },
        initPrintData: function (yl) {
            var fpmxjs = fpmx;
            printJsfp(fpmxjs, yl);
        },
        initPage: function () {

            maxRowIndex = 0, nowRowIndex = 0, maxZkRow = 0;
            fskj = true;
            qdbz = false;
            var jplxs = $.cookie("jsfpbs") || "06";
            jplx = (jplxs == "04") ? "07" : ((jplxs == "05") ? "06" : jplxs);
            if (jplx == "00" || jplx == "02") {
                jplxhs = 3;
            } else if (jplx == "01" || jplx == "03") {
                jplxhs = 6;
            } else if (jplx == "07") {
                jplxhs = 17;
            } else if (jplx == "06") {
                jplxhs = 22;
            } else if (jplx == "08") {
                jplxhs = 8;
            }
            w1 = 14, w2 = 166, w5 = 80, w6 = 100, w7 = 122, w8 = 60, w9 = 90;
            hsbz = true;
            defaultZbj = 6, defaultYbj = -6;
            yfpdm = "";
            yfphm = "";
            fpmx = {};
            zsfs = "0", blxx = "";
            if (ie6) {
                w2 = 171;
                w7 = 122;
                w9 = 83;
            }
            _$("#skr").val($.cookie("jpskr") || _$("#skr").val());
            var _this = this;
            for (var index = 1; index <= 6; index++) {
                _$("#fyxms").append(_this.newPlaceHolder());
            }
            ajaxLoad(ctxPath + "/zzsjp_fs_spbm/check.do", {async: false}, function (json) {
                enableButtons(_$("#xz,#jg,#fs,#cezs"));
                _$("#fpdm").text(json.dqph.dqfpdm);
                _$("#fphm").text(json.dqph.dqfphm);
                _$("#kprq").text(json.kprq);
                _this.szsmStr = genSzsm(json.szsm.group);
                blxx = json.blxx;
                if (blxx != "" && blxx != null && blxx.substring(4, 6) == "08") {
                    _this.szsmStr = "<option value='0'>0%</option><option value='0.03'>3%</option><option value='0.05'>5%</option>";
                }
                //转登记纳税人税率option调整
                if (blxx != "" && blxx != null && blxx.substring(4, 6) == "05") {
                    _this.szsmStr = adjustSloption(_this.szsmStr);
                }
                //zzspp_fpkj_spbm.getPrompt(blxx);
                checkspbmbb();
            });
            //添加行
            _$("#xz").click(function () {
                _this.addRow();
            });
            //删除行
            _$("#sc").click(function (e) {
                _this.delRow();
            });

            //负数
            _$("#fs").click(function () {
                _this.openFskjDlg();
            });
            //开具
            _$("#kj").click(function () {
                if (!checkPrint()) {
                    return;
                }
                if (!checkKey()) {
                    return;
                }

                var valid = _this.validateFsfp();
                if (valid) {
                    //单价数量是否超13位校验
//					if(!_this.djslJy()){
//						return;
//					}
                    checkPerm(function () {
                        _this.addExtraInfo();
                        _$("#fppy").val(jplx);
                        _$("#zzsjp_fsfpkj_spbm_form").submit();
                    });
                }
            });
            //预览
            _$("#yl").click(function () {
                _this.initYLData();
            });
            //打印
            _$("#dy").click(function () {
                _this.printfp();
            });
            //下一张
            _$("#xyz").click(function () {
                navTab.reload(null, {
                    data: {
                        ghdwmc: _$("#ghdwmc").val(),
                        ghdwdm: _$("#ghdwdm").val(),
                        ghdwdzdh: _$("#ghdwdzdh").val(),
                        ghdwyhzh: _$("#ghdwyhzh").val()
                    }
                });
            })
        }
    }
}();