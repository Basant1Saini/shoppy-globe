# ShoppyGlobe E-commerce Application

**ShoppyGlobe** is a comprehensive e-commerce application built with React and Redux, specifically tailored for the Indian market. It provides a complete shopping experience with advanced features, performance optimizations, and modern UI/UX design.

## 🚀 Features

### Core Functionality
- **Product Catalog**: Browse a curated list of vegetarian products with Indian pricing (INR)
- **Advanced Search**: Real-time debounced search with multiple filter criteria
- **Product Filtering**: Filter by categories, price ranges, ratings, and sort options
- **Product Details**: Comprehensive product pages with image galleries and detailed information
- **Shopping Cart**: Full cart management with quantity updates, item removal, and price calculations
- **Tax Calculation**: Automatic GST (18%) calculation for Indian customers
- **Vegetarian Focus**: All products are filtered to show only vegetarian items with clear indicators

### Technical Features
- **React 19**: Latest React features with functional components and hooks
- **Redux Toolkit**: Modern state management for cart functionality
- **React Router**: Client-side routing with lazy loading for performance
- **Performance Optimized**: React.memo, useMemo, useCallback for optimal rendering
- **Responsive Design**: Mobile-first design that works on all screen sizes
- **Loading States**: Skeleton screens for better user experience
- **Error Handling**: Comprehensive error boundaries and user feedback
- **Custom Hooks**: Reusable hooks for API calls, debouncing, and data fetching

## Getting Started

### Prerequisites

- Node.js (v14 or above)
- NPM (v6 or above)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/shoppy-globe.git
   cd shoppy-globe
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

### Running the Application

Start the development server:

```bash
npm start
```

Visit [http://localhost:3000](http://localhost:3000) to view the application in your browser. The development server will automatically reload whenever you make changes to the code.

### Building for Production

To create a production build of the application, run:

```bash
npm run build
```

This will create a `build` folder containing the production build.

## 🧪 Testing

The application includes comprehensive unit tests:

```bash
npm test
```

### Test Coverage
- **Component Testing**: React components with Redux integration
- **User Interaction Testing**: Button clicks, form inputs, and navigation
- **State Management Testing**: Redux actions and reducers
- **Mock Testing**: API calls and external dependencies

## 📦 Available Scripts

In the project directory, you can run:

- `npm start`: Starts the development server on http://localhost:3000
- `npm run build`: Builds the app for production to the `build` folder
- `npm test`: Runs the test suite with Jest and React Testing Library
- `npm run eject`: Ejects the app from Create React App (⚠️ irreversible)

## 🏗️ Architecture

```
src/
├── components/          # Reusable UI components
│   ├── LoadingSkeleton.js
│   ├── ProductFilter.js
│   └── Toast.js
├── hooks/              # Custom React hooks
│   ├── useDebounce.js
│   └── useIndianProducts.js
├── redux/              # State management
│   ├── store.js
│   └── cartSlice.js
├── utils/              # Utility functions
│   ├── currency.js
│   └── vegFilter.js
└── pages/              # Main application pages
    ├── App.js
    ├── ProductList.js
    ├── ProductDetail.js
    ├── Cart.js
    └── NotFound.js
```

## 🌟 Recent Improvements

### Performance Optimizations
- **React.memo**: Optimized component re-rendering
- **Debounced Search**: 300ms delay to prevent excessive API calls
- **Lazy Loading**: Code splitting for better initial load times
- **Memoized Calculations**: Cached expensive computations

### User Experience Enhancements
- **Loading Skeletons**: Better loading states instead of spinners
- **Toast Notifications**: User feedback for actions
- **Advanced Filtering**: Multi-criteria product filtering
- **Responsive Design**: Optimized for mobile and desktop

### Code Quality
- **Comprehensive Testing**: Unit tests for all major components
- **TypeScript-ready**: Well-documented prop types and interfaces  
- **Error Boundaries**: Graceful error handling
- **Accessibility**: ARIA labels and keyboard navigation support

## 🔧 Technical Stack

- **Frontend**: React 19, Redux Toolkit, React Router
- **Styling**: CSS3 with CSS Grid and Flexbox
- **Testing**: Jest, React Testing Library
- **API**: DummyJSON for product data
- **Build Tool**: Create React App
- **Package Manager**: npm

## 🚀 Deployment

The application is optimized for deployment on:
- **Vercel** (recommended)
- **Netlify**
- **GitHub Pages**
- **Firebase Hosting**

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [DummyJSON](https://dummyjson.com/) for providing the product API
- [Create React App](https://create-react-app.dev/) for the build setup
- [Redux Toolkit](https://redux-toolkit.js.org/) for state management
