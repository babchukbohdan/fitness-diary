import React from 'react'
import './TodoList.scss'

export const TodoList = () => {
  const initialState = [
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
