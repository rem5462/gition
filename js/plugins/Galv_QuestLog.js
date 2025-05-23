//-----------------------------------------------------------------------------
//  Galv's Quest Log
//-----------------------------------------------------------------------------
//  For: RPGMAKER MV
//  Galv_QuestLog.js
//-----------------------------------------------------------------------------
//  2017-07-24 - Version 1.3 - added ability to remove failed quest category
//                             from the quest log.
//  2017-02-01 - Version 1.2 - added ability to show/hide quest categories
//                             during game
//  2016-12-12 - Version 1.1 - added setting to change seperator character for
//                             objectives and resolutions.
//  2016-11-10 - Version 1.0 - release
//-----------------------------------------------------------------------------
// Terms can be found at:
// galvs-scripts.com
//-----------------------------------------------------------------------------

var Imported = Imported || {};
Imported.Galv_QuestLog = true;

var Galv = Galv || {};                  // Galv's main object
Galv.QUEST = Galv.QUEST || {};          // Galv's stuff

//-----------------------------------------------------------------------------
/*:
 * @plugindesc Gv_RPG任务系统  任务R1
 * 
 * @author Galv - galvs-scripts.com 汉化:硕明云书
 *
 * @param File
 * @text 任务文件名
 * @desc 任务 txt 文件的名称 (.txt).
 * @default Quests
 *
 * @param Folder
 * @text 文件夹
 * @desc 项目中 txt 文件所在的文件夹名称。
 * @default data
 *
 * @param Separator Character
 * @text 分隔符
 * @desc 用于分隔目标/分辨率文本的字符。
 * Default: , (comma)
 * @default ,
 *
 * @param - OPTIONS -
 * @text ---选项---
 * @desc
 * @default
 *
 * @param Font Size
 * @text 字体大小
 * @desc 任务日志中任务文本的字体大小
 * Default: 28
 * @default 22
 *
 * @param Categories
 * @text 类别
 * @desc 任务类别的有序列表，以逗号分隔 |为每个指定十六进制颜色代码
 * @default 主线任务|#ffcc66,支线任务|#ffff99,特殊任务|#ccccff
 *
 * @param -- ICONS --
 * @text ---图标---
 * @desc
 * @default
 *
 * @param Not Complete Icon
 * @text 未完成图标
 * @desc 尚未完成的目标旁边显示的图标
 * @default 163
 *
 * @param Complete Icon
 * @text 完成图标
 * @desc 已完成目标旁边显示的图标
 * @default 164
 *
 * @param Failed Icon
 * @text 失败图标
 * @desc 失败目标旁边显示的图标
 * @default 162
 *
 * @param Tracked Quest Icon
 * @text 跟踪任务图标
 * @desc 当前跟踪的任务旁边显示的图标
 * @default 88
 *
 * @param -- VOCAB --
 * @text ---词汇---
 * @desc
 * @default
 *
 * @param Quest Command
 * @text 任务命令
 * @desc 菜单中用于任务命令的文本。留空以不使用它。
 * @default 任务
 *
 * @param Active Cmd Txt
 * @text 任务命令文本
 * @desc 查看活动任务的命令
 * @default 任务
 *
 * @param Completed Cmd Txt
 * @text 已完成的命令文本
 * @desc 查看已完成任务的命令
 * @default 完成任务
 *
 * @param Failed Cmd Txt
 * @text 失败的命令文本
 * @desc 用于查看失败任务的命令。留空可从菜单中删除失败的任务
 * @default 失败任务
 *
 * @param Desc Txt
 * @text 描述标题文本
 * @desc 任务描述上方的标题
 * @default 任务描述
 *
 * @param Objectives Txt
 * @text 目标标题文本
 * @desc 任务描述上方的标题
 * @default 任务目标:
 *
 * @param Difficulty Txt
 * @text 难度文本
 * @desc 任务的级别/难度值旁边的文本
 * @default 难度
 *
 * @param No Tracked Quest
 * @text 无跟踪任务
 * @desc 未跟踪任务时显示的文本
 * @default 暂无任何任务
 *
 * @param -- EXTRA --
 * @text --额外--
 * @desc 以下设置适用于 Galv 的定时消息弹出窗口
 * @default
 *
 * @param Pop XY
 * @text 窗口 XY
 * @desc 定时弹出窗口的 X，Y 位置
 * @default 20,20
 *
 * @param Pop Time
 * @text 弹出时间
 * @desc 弹出窗口在屏幕上保留了多少帧
 * @default 130
 *
 * @param Pop New Quest
 * @text 弹出新任务
 * @desc 激活任务时显示在任务名称之前的文本
 * @default 新任务：
 *
 * @param Pop Complete Quest
 * @text 弹出完成任务
 * @desc 任务完成时显示在任务名称之前的文本
 * @default 任务完成：
 *
 * @param Pop Fail Quest
 * @text 弹出失败任务
 * @desc 任务失败时在任务名称前显示的文本
 * @default 任务失败：
 *
 * @param Pop New Objective
 * @text 弹出新目标
 * @desc 激活目标时在目标名称之前显示的文本
 * @default 新目标：
 *
 * @param Pop Complete Objective
 * @text 弹出完整目标
 * @desc 目标完成时在目标名称之前显示的文本
 * @default 目标完成：
 *
 * @param Pop Fail Objective
 * @text 弹出失败目标
 * @desc 失败时在目标名称之前显示的文本
 * @default 目标失败:
 *
 * @help
 *   Galv's Quest Log
 * ----------------------------------------------------------------------------
 * 另一个用于RPG Maker MV的任务日志插件，但以Galv的风格编写。帮助
 * 玩家跟踪多个任务并通知何时
 * 任务被接受、更改或完成。
 *
 * 进行任务
 * --------------
 * 默认情况下，任务信息存储在项目的.txt文件中：
 * /data/Quests.txt
 * 每个任务必须使用下面解释的标签和数据进行设置。
 *
 * <quest i:Quest Name|d|c>
 * objectiveName,objectiveName,objectiveName,objectiveName,objectiveName
 * resolution text, resolution text, resolution text
 * Description text lines here...
 * Description text lines here...
 * Description text lines here...
 * Description text lines here...
 * </quest>
---------------------------------------
 <quest 1:村长的信|1|0>
信交给村长
找到村长的任务索引文本

找到村长后把信给村长！


\C[16]任务奖励:

\i[176]药水x1
</quest>
---------------------------------------
 * i = 任务 ID。这必须是唯一的数字
 * Quest Name = 用作任务名称的文本
 * d = 难度值。例如。如果任务有推荐的等级。
 * c = 类别 ID. 0 表示第一个，1 表示第二个，依此类推。基于列表
 * 在插件设置中设置的类别。
 * -- 第二行用于目标名称。如果没有目标，请保留
 * 行空白，它们不会显示在任务日志中。
 * -- 第三行用于分辨率文本，可以使用
 * 脚本调用并显示在任务描述下方。这条线可以
 * 如果不使用，则留空。
 * 其他行用于任务描述，可以使用一些格式 
 * 代码，如 \c[x]  \i[x]  来更改颜色或添加图标等。
 *
 * 查看演示中的 /data/Quest.txt 文件以获取示例。
 *
 *
 * ----------------------------------------------------------------------------
 *  脚本调用
 * ----------------------------------------------------------------------------
 *
 *    Galv.QUEST.viewLog();   // 手动启动任务日志场景
 *
 *    Galv.QUEST.catStatus(id,status); // id 是任务的索引号
 *                                     // 您在插件中设置的类别
 *                                     // 设置。0 第一，1 秒，依此类推
 *                                     // 状态可以是真或假来设置
 *                                     // 类别是否可见。
 *                                     // 默认情况下，类别均为真
 *
 *    Galv.QUEST.track(id);   // 设置正在跟踪的任务
 *
 *    Galv.QUEST.activate(id);   // 开始一个任务
 *    Galv.QUEST.fail(id);       // 任务失败。
 *    Galv.QUEST.complete(id);   // 完成任务
 *
 *    Galv.QUEST.resolution(id,i);  // 文本索引 ID任务ID  I是第几个
 *                                 
 *
 *    Galv.QUEST.objective(id,objId,status); // 更改任务的目标
 *                                           // id     = 任务的 ID
 *                                           // objId  = 目标
 *                                           //          (0 is 第一个)
 *                                           // 状态可以是...
 *                                           //  -1  or  '隐藏'
 *                                           //   0  or  '激活'
 *                                           //   1  or  '完成'
 *                                           //   2  or  '失败'
 * EXAMPLES
 * Galv.QUEST.objective(3,0,'complete');  // 完成任务3的第一个目标
 * Galv.QUEST.objective(3,0,1);           // 完成任务3的第一个目标
 * Galv.QUEST.complete(3);  // 完成任务 3 (不改变任何目标)
 * Galv.QUEST.objective(1,2,'hide');      //隐藏任务1的第三个目标
 *
 * EXTRA
 * 如果您安装了Galv的定时消息弹出窗口，它将自动
 * 显示获得，完成或失败的任务和目标的弹出窗口。
 * 您可以通过在脚本末尾添加 true 参数来防止弹出窗口
 * 叫。例如，以下是不显示弹出窗口的示例：
 * Galv.QUEST.objective(3,0,'complete',true);
 * Galv.QUEST.fail(2,true);
 * Galv.QUEST.activate(3,true);
 *  
 * ----------------------------------------------------------------------------
 *  控制变量脚本
 * ----------------------------------------------------------------------------
 *
 *    Galv.QUEST.status(id)   // 返回 0 个不完整、1 个完成、2 个失败
 *                            // 如果任务从未激活，则返回 -1。
 *
 *    Galv.QUEST.status(id,x)    x 是检查状态的目标数字
 *                              // （记住 0 是第一个目标）
 *                              // 返回与上述相同的数字
 *
 *    Galv.QUEST.isTracked()    // 返回跟踪任务的 ID。
 *                              // 0 如果没有跟踪任务。
 *
 * ----------------------------------------------------------------------------  
 */



//-----------------------------------------------------------------------------
//  CODE STUFFS
//-----------------------------------------------------------------------------

(function() {

//-----------------------------------------------------------------------------
// GET TXT FILE
//-----------------------------------------------------------------------------

Galv.QUEST.file = {};
Galv.QUEST.file.getString = function(filePath) {
	var request = new XMLHttpRequest();
	request.open("GET", filePath);
	request.overrideMimeType('application/json');
	request.onload = function() {
		if (request.status < 400) {
			Galv.QUEST.createQuests(request.responseText);
		}
	};
	request.send();
};

Galv.QUEST.createQuests = function(string) {
	var lines = string.split("\n");
	var bIndex = 0;
	var record = false;
	Galv.QUEST.txt = {};

	for (var i = 0; i < lines.length; i++) {
		if (lines[i][0] == '<') {
			if (lines[i].contains('</quest>')) {
				record = false;
			} else if (lines[i].contains('<quest')) {
				var qId = lines[i].match(/<quest (.*):(.*)>/i);
				if (qId) {
					bIndex = Number(qId[1]);
					Galv.QUEST.txt[bIndex] = {};
					Galv.QUEST.txt[bIndex].desc = [];
					
					var s = qId[2].split('|');
					Galv.QUEST.txt[bIndex].name = s[0] || '???';
					Galv.QUEST.txt[bIndex].difficulty = s[1] || '???';
					Galv.QUEST.txt[bIndex].category = s[2] || 0;
					
					record = true;
				}
			} 
		} else if (record) {
			Galv.QUEST.txt[bIndex].desc.push(lines[i]);
		}
	};
};

Galv.QUEST.fileName = function() {
	if (!Galv.QUEST.txt) {
		var filename = PluginManager.parameters('Galv_QuestLog')["File"];;
		var folder = PluginManager.parameters('Galv_QuestLog')["Folder"];
		if (folder !== "") folder = folder + "/";
		Galv.QUEST.file.getString(folder + filename + ".txt");
	};
}();


Galv.QUEST.sep = PluginManager.parameters('Galv_QuestLog')["Separator Character"];


// Options
Galv.QUEST.fontSize = Number(PluginManager.parameters('Galv_QuestLog')["Font Size"]);

var cats = PluginManager.parameters('Galv_QuestLog')["Categories"].split(',');
Galv.QUEST.categories = [];
for (var i = 0; i < cats.length; i++) {
	var data = cats[i].split("|");
	Galv.QUEST.categories[i] = {id:i,name:data[0],color:data[1]};
}

// Vocab
Galv.QUEST.menuCmd = PluginManager.parameters('Galv_QuestLog')["Quest Command"];
Galv.QUEST.txtCmdActive = PluginManager.parameters('Galv_QuestLog')["Active Cmd Txt"];
Galv.QUEST.txtCmdComplete = PluginManager.parameters('Galv_QuestLog')["Completed Cmd Txt"];
Galv.QUEST.txtCmdFailed = PluginManager.parameters('Galv_QuestLog')["Failed Cmd Txt"];
Galv.QUEST.txtDesc = PluginManager.parameters('Galv_QuestLog')["Desc Txt"];
Galv.QUEST.txtObj = PluginManager.parameters('Galv_QuestLog')["Objectives Txt"];
Galv.QUEST.txtDiff = PluginManager.parameters('Galv_QuestLog')["Difficulty Txt"];
Galv.QUEST.txtNoTrack = PluginManager.parameters('Galv_QuestLog')["No Tracked Quest"];


// Icons
Galv.QUEST.icon0 = Number(PluginManager.parameters('Galv_QuestLog')["Not Complete Icon"]);
Galv.QUEST.icon1 = Number(PluginManager.parameters('Galv_QuestLog')["Complete Icon"]);
Galv.QUEST.icon2 = Number(PluginManager.parameters('Galv_QuestLog')["Failed Icon"]);
Galv.QUEST.icon3 = Number(PluginManager.parameters('Galv_QuestLog')["Tracked Quest Icon"]);


// Extra
var txt = PluginManager.parameters('Galv_QuestLog')["Pop XY"].split(',');
Galv.QUEST.popXY = [Number(txt[0]),Number(txt[1])];

Galv.QUEST.popTime = Number(PluginManager.parameters('Galv_QuestLog')["Pop Time"]);
Galv.QUEST.txtPopQA = PluginManager.parameters('Galv_QuestLog')["Pop New Quest"];
Galv.QUEST.txtPopQC = PluginManager.parameters('Galv_QuestLog')["Pop Complete Quest"];
Galv.QUEST.txtPopQF = PluginManager.parameters('Galv_QuestLog')["Pop Fail Quest"];
Galv.QUEST.txtPopOA = PluginManager.parameters('Galv_QuestLog')["Pop New Objective"];
Galv.QUEST.txtPopOC = PluginManager.parameters('Galv_QuestLog')["Pop Complete Objective"];
Galv.QUEST.txtPopOF = PluginManager.parameters('Galv_QuestLog')["Pop Fail Objective"];





//-----------------------------------------------------------------------------
// FUNCTIONALITY
//-----------------------------------------------------------------------------


// change status of a category
Galv.QUEST.catStatus = function(id,status) {
	$gameSystem._quests.categoryActive[id] = status;
};

// remove quest from active, completed or failed lists. Quest will still exist as obtained, however.
Galv.QUEST.removeQuest = function(id) {
	if ($gameSystem._quests.quest[id]) {
		Galv.QUEST.sliceArray($gameSystem._quests.active,id);
		Galv.QUEST.sliceArray($gameSystem._quests.completed,id);
		Galv.QUEST.sliceArray($gameSystem._quests.failed,id);
		$gameSystem._quests.quest[id]._status = -1;
	}
};

Galv.QUEST.sliceArray = function(array,element) {
	var index = array.indexOf(element);
	if (index > -1) {
    	array.splice(index, 1);
	}
};

// create quest if doesn't exist
Galv.QUEST.create = function(id) {
	if (!$gameSystem._quests.quest[id] && Galv.QUEST.txt[id]) {
		Galv.QUEST.removeQuest(id);
		$gameSystem._quests.quest[id] = new Game_Quest(id);
	}
};

Galv.QUEST.convStatus = {
	0: 'active',
	1: 'completed',
	2: 'failed',
	'-1': 'hidden',
	'hide': -1,
	'active': 0,
	'activate': 0,
	'completed': 1,
	'complete': 1,
	'failed': 2,
	'fail': 2,
};

// Change quest status
Galv.QUEST.put = function(id,status) {
	var status = status || 0;
	var place = Galv.QUEST.convStatus[status];

	if (status != 0) $gameSystem._quests.tracked = null;
	if ($gameSystem._quests.quest[id]) {
		Galv.QUEST.removeQuest(id);          // remove from all array
		$gameSystem._quests[place].unshift(id); // add to desired array
		$gameSystem._quests.quest[id]._status = status;  // set quest status
	}
};

Galv.QUEST.fail = function(id,hidePopup) {
	Galv.QUEST.create(id);
	Galv.QUEST.put(id,2);
	if (!hidePopup) Galv.QUEST.popup(id,2);
};

Galv.QUEST.complete = function(id,hidePopup) {
	Galv.QUEST.create(id);
	Galv.QUEST.put(id,1);
	if (!hidePopup) Galv.QUEST.popup(id,1);
};

Galv.QUEST.activate = function(id,hidePopup) {
	Galv.QUEST.create(id);
	Galv.QUEST.put(id,0);
	if (!hidePopup) Galv.QUEST.popup(id,0);
};

Galv.QUEST.popup = function(id,status,obj) {
	// plugin writers overwrite this if they want to use different notification/popup
	if (!Imported.Galv_MessageCaptions || !SceneManager._scene) return;
	var x = Galv.QUEST.popXY[0];
	var y = Galv.QUEST.popXY[1];
	var time = Galv.QUEST.popTime;
	switch (status) {
		case -1:
			return; // -1 is hiding an objective.
		case 0:
			var txt = obj != undefined ? Galv.QUEST.txtPopOA : Galv.QUEST.txtPopQA;
			break;
		case 1:
			var txt = obj != undefined ? Galv.QUEST.txtPopOC : Galv.QUEST.txtPopQC;
			break;
		case 2:
			var txt = obj != undefined ? Galv.QUEST.txtPopOF : Galv.QUEST.txtPopQF;
			break;
	}
	if (txt) {
		if (obj != undefined) {
			var name = $gameSystem._quests.quest[id].objectives()[obj];
		} else {
			var name = $gameSystem._quests.quest[id].name();
		}
		SceneManager._scene.createCaptionWindow([x,y],time,[txt + " " + name],[],0);
	}
	
};




// Change quest objective status
Galv.QUEST.objective = function(id,objId,status,hidePopup) {
	Galv.QUEST.create(id);
	if (isNaN(status)) var status = Galv.QUEST.convStatus[status];
	// status can be: 0 is not yet complete, 1 is completed, 2 is failed
	if ($gameSystem._quests.quest[id]) {
		$gameSystem._quests.quest[id]._objectives[objId] = status;
		if (!hidePopup) Galv.QUEST.popup(id,status,objId);
	}
};

Galv.QUEST.track = function(id) {
	if ($gameSystem._quests.quest[id] && $gameSystem._quests.quest[id]._status == 0) {
		$gameSystem._quests.tracked = id;
	} else {
		$gameSystem._quests.tracked = null;
	}
};

Galv.QUEST.isTracked = function() {
	return $gameSystem._quests.tracked || 0;
};

Galv.QUEST.status = function(id,obj) {
	if ($gameSystem._quests.quest[id]) {
		if (obj != undefined) {
			return $gameSystem._quests.quest[id]._objectives[obj];
		} else {
			return $gameSystem._quests.quest[id]._status;
		}
	} else {
		return -1;
	}
};

Galv.QUEST.resolution = function(id,index) {
	if ($gameSystem._quests.quest[id]) $gameSystem._quests.quest[id]._resolution = index;
};

Galv.QUEST.viewLog = function() {
	SceneManager.push(Scene_QuestLog);
};


//-----------------------------------------------------------------------------
//  GAME SYSTEM
//-----------------------------------------------------------------------------

Galv.QUEST.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
	Galv.QUEST.Game_System_initialize.call(this);
	this._quests = {
		tracked: null,
		quest: {},        // id: Game_Quest  - to store obtained quest objects
		active: [],       // array of quest id's player has activated
		completed: [],    // array of quest id's player has completed
		failed: [],       // array of quest id's player has failed
		categoryHide: {active:[],completed:[],failed:[]},  // arrays containing data if category id is expanded or not (0/null for open, 1/true for closed)
		categoryActive: [],
	};
	
	// set all cats to true
	for (var i = 0; i < Galv.QUEST.categories.length; i++) {
		this._quests.categoryActive[i] = true;
	}
};

})();


//-----------------------------------------------------------------------------
//  GAME QUEST
//-----------------------------------------------------------------------------

function Game_Quest() {
    this.initialize.apply(this, arguments);
}

Game_Quest.prototype.initialize = function(id,cat) {
	this._id = id;
	this._cat = cat || 0;
	this._objectives = []; // indexes can be 0,1,2 to store the status of objectives. 0 (or undefined/null) is not yet complete, 1 is completed, 2 is failed
	this._resolution = -1; // the selected resolution to display under the quest description in the quest log. -1 for none.
	this._status = 0;      // 0 is not yet completed, 1 is completed, 2 is failed
};

Game_Quest.prototype.desc = function() {
	return Galv.QUEST.txt[this._id].desc.slice(2);  // returns the description without the first 2 lines (which is objectives and resolutions)
};

Game_Quest.prototype.name = function() {
	return Galv.QUEST.txt[this._id].name;
};

Game_Quest.prototype.difficulty = function() {
	return Galv.QUEST.txt[this._id].difficulty;
};

Game_Quest.prototype.category = function() {
	return Galv.QUEST.txt[this._id].category;
};

Game_Quest.prototype.objectives = function() {
	var array = Galv.QUEST.txt[this._id].desc[0].split(Galv.QUEST.sep);
	return array[0].length <= 1 ? [] : array;
};

Game_Quest.prototype.resolutions = function() {
	var array = Galv.QUEST.txt[this._id].desc[1].split(Galv.QUEST.sep);
	return array[0].length <= 1 ? [] : array;
};

Game_Quest.prototype.hasResolution = function() {
	return this._resolution >= 0;
};

Game_Quest.prototype.resoTxtArray = function() {
	var txt = "";
	if (this._resolution >= 0) {
		var txt = this.resolutions()[this._resolution];
		txt = txt.split('|');
	}
	return txt;
};


//-----------------------------------------------------------------------------
//  SCENE QUESTLOG
//-----------------------------------------------------------------------------

function Scene_QuestLog() {
    this.initialize.apply(this, arguments);
}

Scene_QuestLog.prototype = Object.create(Scene_ItemBase.prototype);
Scene_QuestLog.prototype.constructor = Scene_QuestLog;

Scene_QuestLog.prototype.initialize = function() {
    Scene_ItemBase.prototype.initialize.call(this);
};

Scene_QuestLog.prototype.create = function() {
    Scene_ItemBase.prototype.create.call(this);
    this.createCategoryWindow();
    this.createQuestListWindow();
    this.createInfoWindow();
};

Scene_QuestLog.prototype.createCategoryWindow = function() {
	this._categoryWindow = new Window_QuestCategory();
	this._categoryWindow.setHandler('ok',     this.onCategoryOk.bind(this));
	this._categoryWindow.setHandler('cancel', this.popScene.bind(this));
	this.addWindow(this._categoryWindow);
};

Scene_QuestLog.prototype.createQuestListWindow = function() {
	var wy = this._categoryWindow.y + this._categoryWindow.height;
	var ww = Graphics.boxWidth / 2;
	var wh = Graphics.boxHeight - wy;
	this._itemWindow = new Window_QuestList(0, wy, ww, wh);
	this._itemWindow.setHandler('ok',     this.onItemOk.bind(this));
	this._itemWindow.setHandler('cancel', this.onItemCancel.bind(this));
	this.addWindow(this._itemWindow);
	this._categoryWindow.setItemWindow(this._itemWindow);
};

Scene_QuestLog.prototype.createInfoWindow = function() {
	var ww = this._itemWindow.width;
	var wh = this._itemWindow.height;
	var wx = this._itemWindow.x + ww;
	var wy = this._itemWindow.y;
	this._helpWindow = new Window_QuestInfo(wx,wy,ww,wh);
	this.addWindow(this._helpWindow);
	
	this._itemWindow.setHelpWindow(this._helpWindow);
	this._categoryWindow.setHelpWindow(this._helpWindow);
};

Scene_QuestLog.prototype.onCategoryOk = function() {
	this._itemWindow.activate();
	this._itemWindow.select(0);
};

Scene_QuestLog.prototype.onItemOk = function() {
	this._itemWindow.setTracking();
	this._itemWindow.refresh();
	this._helpWindow.refresh();
	this._itemWindow.activate();
};

Scene_QuestLog.prototype.onItemCancel = function() {
    this._itemWindow.deselect();
    this._categoryWindow.activate();
};


//-----------------------------------------------------------------------------
//  WINDOW QUESTCATEGORY
//-----------------------------------------------------------------------------

function Window_QuestCategory() {
    this.initialize.apply(this, arguments);
}

Window_QuestCategory.prototype = Object.create(Window_HorzCommand.prototype);
Window_QuestCategory.prototype.constructor = Window_QuestCategory;

Window_QuestCategory.prototype.initialize = function() {
    Window_HorzCommand.prototype.initialize.call(this, 0, 0);
};

Window_QuestCategory.prototype.windowWidth = function() {
    return Graphics.boxWidth;
};

Window_QuestCategory.prototype.maxCols = function() {
    return Galv.QUEST.txtCmdFailed == "" ? 2 : 3;
};

Window_QuestCategory.prototype.update = function() {
    Window_HorzCommand.prototype.update.call(this);
    if (this._itemWindow) {
        this._itemWindow.setCategory(this.currentSymbol());
    }
};

Window_QuestCategory.prototype.makeCommandList = function() {
    this.addCommand(Galv.QUEST.txtCmdActive,    'active');
    this.addCommand(Galv.QUEST.txtCmdComplete,  'completed');
    if (Galv.QUEST.txtCmdFailed != "") this.addCommand(Galv.QUEST.txtCmdFailed,   'failed');
};

Window_QuestCategory.prototype.setItemWindow = function(itemWindow) {
    this._itemWindow = itemWindow;
    this.update();
};


//-----------------------------------------------------------------------------
//  WINDOW QUESTCATEGORY
//-----------------------------------------------------------------------------

function Window_QuestList() {
    this.initialize.apply(this, arguments);
}

Window_QuestList.prototype = Object.create(Window_Selectable.prototype);
Window_QuestList.prototype.constructor = Window_QuestList;

Window_QuestList.prototype.initialize = function(x, y, width, height) {
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this._category = 'none';
    this._data = [];
};

Window_QuestList.prototype.setCategory = function(category) {
    if (this._category !== category) {
        this._category = category;
        this.refresh();
        this.resetScroll();
    }
};

Window_QuestList.prototype.maxCols = function() {
    return 1;
};

Window_QuestList.prototype.spacing = function() {
    return 48;
};

Window_QuestList.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
};

Window_QuestList.prototype.item = function(index) {
    var index = index == undefined ? this.index() : index;
	var obj = isNaN(this._data[index]) ? this._data[index] : $gameSystem._quests.quest[this._data[index]];

    return this._data && index >= 0 ? obj : null;
};

Window_QuestList.prototype.setTracking = function() {
	if (!this.item()) return;
	if (this.item().categoryTitle != undefined) {
		// hide/show category
		var catId = this.item().categoryTitle;
		$gameSystem._quests.categoryHide[this._category][catId] = !$gameSystem._quests.categoryHide[this._category][catId];
	} else {
		// Track quest
		if (this.item()._id == Galv.QUEST.isTracked()) {
			Galv.QUEST.track();
		} else {
			Galv.QUEST.track(this.item()._id);
		}
	}
};

Window_QuestList.prototype.makeItemList = function() {
	this._data = [];
	this.buildQuestList();
	switch (this._category) {
		case 'active':
			this._data = this.buildQuestList($gameSystem._quests.active);
			break;
		case 'completed':
			this._data = this.buildQuestList($gameSystem._quests.completed);
			break;
		case 'failed':
			this._data = this.buildQuestList($gameSystem._quests.failed);
			break;
	}
};

Window_QuestList.prototype.buildQuestList = function(questList) {
	var list = [];
	var questList = questList || [];
	
	// setup lists for categories
	for (var i = 0; i < Galv.QUEST.categories.length; i++) {
		if ($gameSystem._quests.categoryActive[i]) list[i] = [{categoryTitle:i,count:0}];
	}

	// put quests into categories
	for (var i = 0; i < questList.length; i++) {
		var cat = $gameSystem._quests.quest[questList[i]].category();
		if (!$gameSystem._quests.categoryActive[cat]) continue;
		list[cat][0].count += 1;

		if (!$gameSystem._quests.categoryHide[this._category][cat]) { // only add it if category isn't hidden
			list[cat].push(questList[i]);
		}
	}

	// concat lists
	var final = [];
	for (var i = 0; i < list.length; i++) {
		final = final.concat(list[i]);
	}
	final = final.filter(function(n){ return n != undefined });

	return final;
};

Window_QuestList.prototype.drawItem = function(index) {
    var item = this.item(index);
    if (item) {
		var rect = this.itemRect(index);
		rect.width -= this.textPadding();
			
		if (item.categoryTitle != undefined) {
			var cat = Galv.QUEST.categories[item.categoryTitle]
			var txt = cat.name;
			this.changeTextColor(cat.color);
			this.drawText(txt,rect.x + 4,rect.y,rect.width);
			this.drawText("(" + item.count + ")",rect.x,rect.y,rect.width,'right');
			this.changeTextColor(this.normalColor());
		} else {
			var icon = item._id == $gameSystem._quests.tracked ? Galv.QUEST.icon3 : Galv.QUEST['icon' + item._status];
			this.drawIcon(icon,rect.x,rect.y);
			this.drawText(item.name(),rect.x + 40,rect.y,rect.width);
		}
    }
};

Window_QuestList.prototype.updateHelp = function() {
    this.setHelpWindowItem(this.item());
};

Window_QuestList.prototype.refresh = function() {
    this.makeItemList();
    this.createContents();
	this.contents.fontSize = Galv.QUEST.fontSize;
    this.drawAllItems();
};


//-----------------------------------------------------------------------------
//  WINDOW QUESTINFO
//-----------------------------------------------------------------------------

function Window_QuestInfo() {
    this.initialize.apply(this, arguments);
}

Window_QuestInfo.prototype = Object.create(Window_Base.prototype);
Window_QuestInfo.prototype.constructor = Window_QuestInfo;

Window_QuestInfo.prototype.initialize = function(x,y,width,height) {
Window_Base.prototype.initialize.call(this, x, y, width, height);
	this._quest = null;
	this.refresh();
};

Window_QuestInfo.prototype.clear = function() {
	this.setItem();
};

Window_QuestInfo.prototype.setItem = function(quest) {
	if (this._quest !== quest) {
		this._quest = quest;
		this.refresh();
	}
};

Window_QuestInfo.prototype.refresh = function() {
    this.contents.clear();
	if (this._quest) {
	    this.drawQuest(this._quest);
	} else if ($gameSystem._quests.tracked) {
		this.drawQuest($gameSystem._quests.quest[$gameSystem._quests.tracked]);
	} else {
		this.drawNoQuest();
	}
};

Window_QuestInfo.prototype.drawHorzLine = function(y) {
    var lineY = y + this.lineHeight() / 2 - 1;
    this.contents.paintOpacity = 48;
    this.contents.fillRect(0, lineY, this.contentsWidth(), 2, this.normalColor());
    this.contents.paintOpacity = 255;
};

Window_QuestInfo.prototype.standardFontSize = function() {
    return Galv.QUEST.fontSize;
};

Window_QuestInfo.prototype.lineHeight = function() {
    return Galv.QUEST.fontSize + 6;
};

Window_QuestInfo.prototype.drawQuest = function(quest) {
	if (quest.categoryTitle != undefined) return;
	this.changeTextColor(this.normalColor());
	// quest heading
	var icon = quest._id == $gameSystem._quests.tracked ? Galv.QUEST.icon3 : Galv.QUEST['icon' + quest._status];
	this.drawIcon(icon,0,0);
	var oy = Math.max((28 - this.standardFontSize()) / 2,0);
	this.drawText(quest.name(),40,oy,this.contentsWidth() - 40);
	var lineY = Math.max(32,this.lineHeight());
	this.drawHorzLine(lineY);
	
	var line = this.lineHeight();
	var y = lineY + line;
	var w = this.contentsWidth();

	// quest difficulty
	this.drawText(Galv.QUEST.txtDiff + " " + quest.difficulty(),0,y,w,'right');
	
	// quest desc
	this.changeTextColor(this.systemColor());
	this.drawText(Galv.QUEST.txtDesc,0,y,w);
	
	this.changeTextColor(this.normalColor());
	var desc = quest.desc().slice();;
	
	if (quest.hasResolution()) {
		// if quest has a selected resolution, add it
		desc.push("");
		desc = desc.concat(quest.resoTxtArray()); // add resolution txt
	}
	
	y += 10;
	for (var i = 0; i < desc.length; i++) {
		y += line;
		this.drawTextEx(desc[i], 0, y);
	}
	y += line * 2;
	
	// quest objectives
	var objs = quest.objectives();
	if (objs.length > 0) {
		this.changeTextColor(this.systemColor());
		this.drawText(Galv.QUEST.txtObj,0,y,w);
		this.changeTextColor(this.normalColor());
		y += line + 10;

		// list objectives
		for (var i = 0; i < objs.length; i++) {
			var status = quest._objectives[i] || 0;
			if (status >= 0) {
				var icon = Galv.QUEST['icon' + status];
				this.drawIcon(icon,0,y);
				this.drawTextEx(objs[i],40,y + oy);
				y += line + 8;
			}
		}
	}
};

Window_QuestInfo.prototype.drawNoQuest = function() {
	var y = this.contentsHeight() / 2 - this.standardFontSize() / 2 - this.standardPadding();
	this.drawText(Galv.QUEST.txtNoTrack,0,y,this.contentsWidth(),'center');
};


//-----------------------------------------------------------------------------
//  ADD MENU COMMAND
//-----------------------------------------------------------------------------

if (Galv.QUEST.menuCmd) { // only add this if there's menu command text
	Galv.QUEST.Window_MenuCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
	Window_MenuCommand.prototype.addOriginalCommands = function() {
		Galv.QUEST.Window_MenuCommand_addOriginalCommands.call(this);
		this.addQuestCommand();
	};
	
	Window_MenuCommand.prototype.addQuestCommand = function() {
		var enabled = true;
		this.addCommand(Galv.QUEST.menuCmd, 'quest', enabled);
	};
	
	Galv.QUEST.Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
	Scene_Menu.prototype.createCommandWindow = function() {
		Galv.QUEST.Scene_Menu_createCommandWindow.call(this);
		this._commandWindow.setHandler('quest',      this.commandQuestLog.bind(this));
	};
	
	Scene_Menu.prototype.commandQuestLog = function() {
		Galv.QUEST.viewLog();
	};
};