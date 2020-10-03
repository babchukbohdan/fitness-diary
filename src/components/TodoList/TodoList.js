import React from 'react'
import './TodoList.scss'

export const TodoList = () => {
  const initialState = [
    "Баг: когда сохраняю тренировочный день - удаляеться инфа в firebase ",
    `Реализовать в Progress page: возможность выбирать несколько упражнений(других данных) для отображения на одном графике,
    если много данных рендерить график с возможностью зума, сделать цвета для графиков, добавить название месяцев в графика, изменить цвет текста в графике диеты, исправить анимацию появления графиков при ререндере`,
    "убрать проверки в тудей редюсере",
    "Implement pharmacology tab, change today reducer and state",
    "Make save btn disabled without changes in state",
    "Fix note(create handler) in diet tab on today training page",
    "Создать хук для отмены загрузки данных если компонент удаляется",
    "Стилизовать DateInput Component",
    "Реализовать глобальные настройки приложения",
    "Добавить иконку меню",
    "Сделать макет адаптивным",
    "Дополнить базу данных упражнений",
    "Сделать валидацию input[type=date] в Month component",
    "Разбить стили по компонентам",
    "Разработать темную тему",
    "Реализовать компонент Progress с графиком прогресса в выбраном упражнении за выбранный период",
    "Добавить анимации",
    "Стилизовать Info component"
  ]

  return (
    <div className="todo wrap">
      <h3 className="todo__title">Todo List</h3>
      <ul className="todo__list">
        {
          initialState.map((item, i) => <li key={i} className="todo__item">{i + 1}. {item}</li>)
        }
      </ul>
    </div>
  )
}
