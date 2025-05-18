/*:
 * @plugindesc 敌人目标窗口血量显示
 * @author 茶の助
 *
 * @help 
 敌人的备注中添加：
 <ＨＰ非表示>   //将不会显示血量
 */

(function() {

    Window_Base.prototype.hpGaugeColor = function(rate) {
        return [this.hpGaugeColor1(), this.hpGaugeColor2()];
    };

    Window_BattleEnemy.prototype.drawItem = function(index) {
        var rect = this.itemRectForText(index);
        if(!$dataEnemies[this._enemies[index]._enemyId].note.match('<ＨＰ非表示>')){
          var hprate = this._enemies[index].hp / this._enemies[index].mhp;
          var color = this.hpGaugeColor(hprate);
          this.drawGauge(rect.x, rect.y, rect.width, hprate, color[0], color[1], this.gaugeBackColor());
        }
        this.resetTextColor();
        var name = this._enemies[index].name();
        this.drawText(name, rect.x, rect.y, rect.width, 'left', true); //
    };

})();