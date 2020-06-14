import React from 'react'
import './TodoList.scss'

export const TodoList = () => {
  const initialState = [
    "Добавить анимации",
    "Дополнить базу данных упражнений",
    "Сделать макет адаптивным",
    "Добавить иконку меню",
    "Сделать валидацию input[type=date] в Month component",
    "Реализовать глобальные настройки приложения",
    "Разбить стили по компонентам",
    "Разработать темную тему",
    "Реализовать компонент Progress с графиком прогресса в выбраном упражнении за выбранный период",
    "Стилизовать Info component"
  ]

  return (
    <div className="todo">
      <h3 className="todo__title">Todo List</h3>
      <ul className="todo__list">
        {
          initialState.map((item, i) => <li key={i} className="todo__item">{i + 1}. {item}</li>)
        }
      </ul>
    </div>
  )
}