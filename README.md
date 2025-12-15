# Interactive Bézier Curve with Physics & Sensor Control

## Project Overview

This project implements an **interactive cubic Bézier curve** that behaves like a **springy rope**, reacting in real time to user input.

* On **Web**, the curve responds to mouse movement.
* On **iOS**, the curve responds to device gyroscope data.

All mathematics, motion, and rendering logic are implemented **from scratch**, without using any built-in Bézier, animation, or physics libraries.

The goal of this assignment is to demonstrate understanding of:

* Cubic Bézier curve mathematics
* Vector calculus (derivatives & tangents)
* Spring–damping physics
* Real-time input handling
* Graphics rendering at 60 FPS

---

## Features

* Cubic Bézier curve rendering using parametric sampling
* Dynamic control points with spring physics
* Real-time interaction (mouse / gyroscope)
* Tangent vector visualization along the curve
* Smooth animation using frame-based updates

---

## Mathematical Foundation

### 1. Cubic Bézier Curve

The curve is defined by four control points: P₀, P₁, P₂, and P₃.

The position on the curve for parameter `t ∈ [0, 1]` is computed using:

```
B(t) = (1−t)³P₀ + 3(1−t)²tP₁ + 3(1−t)t²P₂ + t³P₃
```

* The curve is sampled at small intervals (Δt ≈ 0.01)
* Each sampled point is connected to form a smooth curve

---

### 2. Tangent Computation

To visualize the direction of the curve, tangent vectors are computed using the derivative of the Bézier equation:

```
B'(t) = 3(1−t)²(P₁−P₀) + 6(1−t)t(P₂−P₁) + 3t²(P₃−P₂)
```

Steps:

1. Compute the derivative at a given `t`
2. Normalize the resulting vector
3. Draw a short line segment to represent the tangent direction

Tangents are rendered at fixed intervals along the curve.

---

## Physics Model (Spring–Damping)

The dynamic control points (P₁ and P₂) behave like masses attached to springs.

### Motion Equation

```
acceleration = -k * (currentPosition − targetPosition)
               − damping * velocity
```

Where:

* `k` → spring stiffness constant
* `damping` → resistance to oscillation
* `velocity` → current movement speed

### Update Steps per Frame

1. Compute acceleration using the spring equation
2. Update velocity
3. Update position

This produces smooth, natural motion similar to a rope or elastic band.

---

## Control Points Behavior

* **P₀ and P₃**: Fixed endpoints of the curve
* **P₁ and P₂**: Dynamic control points

  * Web: Target position is influenced by mouse movement
  * iOS: Target position is influenced by gyroscope rotation (pitch, yaw, roll)

The spring physics ensures that the control points smoothly follow the target instead of snapping instantly.

---

## Rendering Pipeline

### Web (HTML Canvas + JavaScript)

* Canvas used for all drawing
* `requestAnimationFrame` ensures ~60 FPS
* Rendering includes:

  * Bézier curve path
  * Control points as small circles
  * Tangent vectors as short lines

### iOS (Swift)

* `CoreMotion` used to access gyroscope data
* `CADisplayLink` used for frame updates
* Custom drawing logic (no UIBezierPath)

---

## Code Organization

```
/ (root)
├── index.html        # Canvas and UI (Web)
├── main.js           # Bézier math, physics, rendering logic
├── README.md         # Project documentation
```

For iOS:

```
├── ViewController.swift
├── MotionManager.swift
├── BezierMath.swift
```

Logic is separated into:

* Math (Bézier + tangents)
* Physics (spring–damping)
* Input handling
* Rendering

---

## Design Decisions

* Manual math implementation to demonstrate fundamentals
* Spring physics chosen for natural, rope-like motion
* Tangent visualization added for mathematical clarity
* Lightweight rendering to maintain consistent frame rate

---

## Performance

* Frame-based updates synchronized with display refresh
* Efficient vector math and sampling
* Maintains **~60 FPS** on modern browsers and devices

---

## How to Run

### Web

1. Open `index.html` in a modern browser
2. Move the mouse to interact with the curve

### iOS

1. Open the project in Xcode
2. Run on a real device (gyroscope required)
3. Tilt or rotate the device to interact

---

## Demo Requirement

A **screen recording (≤ 30 seconds)** is included showing:

* Real-time interaction
* Smooth spring motion
* Tangent visualization

---

## Conclusion

This project demonstrates a complete, low-level implementation of an interactive Bézier system, combining mathematics, physics, and graphics programming to create a responsive and visually intuitive simulation.

---

**Author:** Shirani Agarwal
