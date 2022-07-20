<h1 align="center">React-burger project</h1>

Проектное задание Яндекс Практикума на курсе [React-разработчика](https://practicum.yandex.ru/react/).

Проект создан с ипользованием `CRA(Create-react-app)` + `TypeScript` + `Redux` + `DnD(React Drag & Drop)`.

### Ссылки на проект

[Gh-Page](./).

[Яндекс.Облако](./).

## Статус проекта

- [x] Спринт 1
  - [x] Инициализировать новый CRA-проект
  - [x] Настроить удалённый и локальный репозитории
  - [x] Верстка компонентов
    - [x] AppHeader
    - [x] BurgerIngredients
    - [x] BurgerConstructor
    - [x] Modal
    - [x] ModalOverlay
    - [x] OrderDetails
    - [x] IngredientDetails
  - [x] Адаптив
- [x] Спринт 2
  - [x] Обновление инфраструктуры приложения
  - [x] Подготовка хранилища
    - [x] Список всех полученных ингредиентов
    - [x] Список всех ингредиентов в текущем конструкторе бургера
    - [x] Объект текущего просматриваемого ингредиента
    - [x] Объект созданного заказа
  - [x] Экшены и редьюсеры
    - [x] Получение списка ингредиентов от API
    - [x] Получение списка ингредиентов для конструктора бургера
    - [x] Добавление данных о просматриваемом в модальном окне
    - [x] Удаление данных о просматриваемом в модальном окне ингредиенте при закрытии модального окна.
    - [x] Получение и обновление номера заказа в модальном окне
  - [x] Навигации по ингредиентам
  - [x] DnD (перетаскивания ингредиентов)
  - [x] сортировка ингредиентов
- [x] Спринт 3

  - [x] Страницы авторизации и регистрации, профиля, восстановления и сброса пароля.
    - [x] `/login` - страница авторизации.
    - [x] `/register` - страница регистрации.
    - [x] `/forgot-password` - страница восстановления пароля.
    - [x] `/reset-password` - страница сброса пароля.
    - [x] `/profile` — страница с настройками профиля пользователя.
    - [x] `/ingredients/:id` — страница ингредиента.
  - [x] Авторизация и регистрация
  - [x] Авторизация и обновление токена
  - [x] Получение и обновление информации о пользователе
  - [x] Авторизация и обновление токена
  - [x] Защищённые маршруты в приложении
    - [x] Куда не может попасть `неавторизованный` пользователь:
      - [x] Маршрут `/profile`.
      - [x] Все вложенные в `/profile` маршруты.
      - [x] Все остальные маршруты не защищены.
    - [x] Куда не может попасть `авторизованный` пользователь:
      - [x] Маршруты `/login` и `/register`.
      - [x] Маршруты `/forgot-password` и `/reset-password.`

- [x] Спринт 4

  - [x] Проект типизирован с применением TypeScript.

- [x] Спринт 5

  - [x] Страницы ленты заказа - пользователя/общая. Страницы/попапы деталей заказа.
    - [x] `/feed` - страница ленты заказов. Доступен всем пользователям.
    - [x] `/feed/:id` - страница заказа в ленте. Доступен всем пользователям.
    - [x] `/profile/orders` - страница истории заказов пользователя. Доступен только авторизованным пользователям.
    - [x] `/profile/orders/:id` - страница заказа в истории заказов. Доступен только авторизованным пользователям.
  - [x] Новые роуты защищены от неавторизованных пользователей.
  - [x] Для отображения заказа использован WebSocket.
  - [x] Доработано создание заказа, теперь заказ "реален" его можно посмотреть в истории заказов.
  - [x] Для контроля стостояния WebSocket используется Redux.

- [ ] Спринт 6
  - [ ] Покрыты тестами все редьюсеры в проекте (начальное состояние хранилища, все обработчики).
  - [ ] Написан полноценный тест для функциональности страницы «Конструктор» с использованием Cypress.
    - [ ] Функциональность перетаскивания ингредиента
    - [ ] Создания заказа.
    - [ ] Работа модальных окон на странице «Конструктор».
  - [ ] Создана ВМ в Яндекс.Облаке и размещена фронтенд часть приложения Stellar Burger на нём.
  - [ ] Ссылка на проект добавлена в README проекта.
