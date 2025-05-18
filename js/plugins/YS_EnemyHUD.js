/*:
 * @plugindesc YS_战斗敌人血量显示[v1.1]
 * @author 硕明云书
 *
 * @param HP Bar Width
 * @text 血量条宽度
 * @desc 血量条的宽度（像素）。
 * @type number
 * @default 100
 *
 * @param HP Bar Height
 * @text 血量条高度
 * @desc 血量条的高度（像素）。
 * @type number
 * @default 10
 *
 * @param HP Bar X Offset
 * @text 血量条X偏移
 * @desc 血量条相对敌人图像中心的X轴偏移量（像素）。
 * @type number
 * @default -50
 *
 * @param HP Bar Y Offset
 * @text 血量条Y偏移
 * @desc 血量条相对敌人图像底部的Y轴偏移量（像素）。
 * @type number
 * @default -300
 *
 * @param HP Text Y Offset
 * @text 血量文本Y偏移
 * @desc 血量文本相对血量条的Y轴偏移量（像素）。
 * @type number
 * @default -5
 *
 * @param HP Text Size
 * @text 血量文本大小
 * @desc 血量文本的字体大小（像素）。
 * @type number
 * @default 10
 *
 * @param Show Max HP
 * @text 显示最大血量
 * @desc 是否在血量文本中显示敌人的最大血量值。是：true，否：false。
 * @type boolean
 * @default true
 *
 * @help 
 * ============================================================================ 
 * > 插件介绍
 * ============================================================================ 
 * 在战斗中，敌人上会显示带有背景和数字值的敌人血量条。
 * 
 * ============================================================================ 
 * > 使用条款
 * ============================================================================ 
 * 1、仅限于在RPG Maker MV上使用
 * 2、免费用于个人和商业项目
 * 3、允许分发分享无需通知作者
 * 
 * ============================================================================ 
 * > 历史版本
 * ============================================================================ 
 * v1.0 - 发布 
 * v1.1 - 修复多次进入战斗血条位置错误问题 [修改作者:沁儂(kinon)]
 */
(function() {
    var parameters = PluginManager.parameters('YS_EnemyHUD');
    var barWidth = Number(parameters['HP Bar Width'] || 100);
    var barHeight = Number(parameters['HP Bar Height'] || 10);
    var barXOffset = Number(parameters['HP Bar X Offset'] || -50);
    var barYOffset = Number(parameters['HP Bar Y Offset'] || -300);
    var textYOffset = Number(parameters['HP Text Y Offset'] || -5);
    var textSize = Number(parameters['HP Text Size'] || 10);
    var showMaxHp = String(parameters['Show Max HP'] || 'true') === 'true';

    var _Sprite_Enemy_update = Sprite_Enemy.prototype.update;
    Sprite_Enemy.prototype.update = function() {
        _Sprite_Enemy_update.call(this);
        this.createHpBar();
    };

    Sprite_Enemy.prototype.createHpBar = function() {
        // 清理旧的 HP 条对象，避免重复创建导致位置错误
        if (this._hpBar) {
            this.removeChild(this._hpBar);
            this._hpBar = null;
        }
        if (this._hpBarBack) {
            this.removeChild(this._hpBarBack);
            this._hpBarBack = null;
        }
        if (this._hpBarText) {
            this.removeChild(this._hpBarText);
            this._hpBarText = null;
        }

        var backgroundMargin = 2; // HP条背景的边距
        // 创建 HP 条背景精灵
        this._hpBarBack = new Sprite(new Bitmap(barWidth + backgroundMargin * 2, barHeight + backgroundMargin * 2));
        this._hpBarBack.x = barXOffset - backgroundMargin;
        this._hpBarBack.y = this.bitmap.height + barYOffset - backgroundMargin;
        this._hpBarBack.bitmap.fillAll('rgba(0, 0, 0, 0.6)'); // 黑色半透明背景
        this.addChild(this._hpBarBack);

        // 创建 HP 条精灵
        this._hpBar = new Sprite(new Bitmap(barWidth, barHeight));
        this._hpBar.x = barXOffset;
        this._hpBar.y = this.bitmap.height + barYOffset;
        this.addChild(this._hpBar);

        // 创建 HP 条文本精灵
        this._hpBarText = new Sprite(new Bitmap(barWidth, 18)); // 为文本预留足够的空间
        this._hpBarText.y = this.bitmap.height + barYOffset + textYOffset;
        this._hpBarText.x = barXOffset;
        this.addChild(this._hpBarText);

        this.updateHpBar();
    };

    Sprite_Enemy.prototype.updateHpBar = function() {
        var hpRate = this._enemy.hpRate();
        var hpCurrent = Math.ceil(this._enemy.hp);
        var hpMax = Math.ceil(this._enemy.mhp);
        var hpText = showMaxHp ? hpCurrent + '/' + hpMax : hpCurrent.toString();

        // 更新 HP 条
        this._hpBar.bitmap.clear();
        this._hpBar.bitmap.fillRect(0, 0, barWidth * hpRate, barHeight, '#ff0000');

        // 更新 HP 条文本
        var textBitmap = this._hpBarText.bitmap;
        textBitmap.clear();
        textBitmap.fontSize = textSize;
        textBitmap.drawText(hpText, 0, 0, barWidth, 18, 'center');
    };
})();
