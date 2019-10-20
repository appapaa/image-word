import React, { Component } from 'react';

class Plugin extends Component {
  render() {
    const { bottom } = this.props;
    return (
      <div className='app-menu-help' style={{ bottom }}>
        <div className='app-menu-help-num'>1</div>
        <div className='app-menu-help-text'>
          изучай новый материал с
          помощью кнопки “learn”.
          Кнопка “got it” добавит
          слово в тестовый модуль и
          исключит его из словаря
          обучения. Количество слов
          к обучению отражается в
          счётчике на главном
        экране
        </div>
        <div className='app-menu-help-num'>2</div>
        <div className='app-menu-help-text'>
          исключай/возвращай
          слова в модуль обучения
          с помощью “exclude”
        </div>

        <div className='app-menu-help-num'>3</div>
        <div className='app-menu-help-text'>
          проверяй свои знания на
          вкладке “test” после
          прохождения обучения
          </div>
      </div>
    );
  }
}
Plugin.defaultName = 'Help';

export default Plugin;
