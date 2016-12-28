import java.util.*;

int INPUT = 1358;
int SIZE = 50;
int CELL_SIZE;

ArrayList<Cell> grid;
Cell CELL_END;
ArrayList<Cell> CELLS_OPEN;
ArrayList<Cell> CELLS_CLOSED;

boolean solved = false;

void setup() {
  size(900, 900);
  
  CELL_SIZE = floor(width / SIZE);
  
  grid = createGrid(INPUT);
  
  
  Cell start = getCell(1, 1);
  Cell end = getCell(31, 39);
  pathfinder(start, end);
}

void draw() {
  background(51);
  
  for (Cell c : grid) {
    c.draw();
  }
  
  if (!solved) {
    solved = pathfinderLoop(CELL_END, CELLS_OPEN, CELLS_CLOSED);
  }
}

ArrayList<Cell> createGrid(int input) {
  ArrayList<Cell> g = new ArrayList<Cell>();
  for (int y = 0; y < SIZE; ++y) {
    for (int x = 0; x < SIZE; ++x) {
      int r = x*x + 3*x + 2*x*y + y + y*y + input;
      String[] bin = Integer.toBinaryString(r).split("");
      int ones = 0;
      for (int i = 0; i < bin.length; ++i) {
        if (Integer.parseInt(bin[i]) == 1) ones++;
      }
      g.add(new Cell(x, y, ones % 2 == 0 ? CellType.OPEN : CellType.WALL));
    }
  }
  return g;
}

Cell getCell(int i, int j) {
  if (i < 0 || i > SIZE - 1 || j < 0 || j > SIZE - 1) return null;
  return grid.get(i + j * SIZE);
}

int calcHeuristic(Cell cell, Cell end) {
  return abs(cell.i - end.i) + abs(cell.j - end.j);
}

ArrayList<Cell> getNeighbours(Cell cell) {
  ArrayList<Cell> neighbours = new ArrayList<Cell>();
  
  Cell top = getCell(cell.i, cell.j - 1);
  Cell right = getCell(cell.i + 1, cell.j);
  Cell bottom = getCell(cell.i, cell.j + 1);
  Cell left = getCell(cell.i - 1, cell.j);
  
  if (top != null && top.type != CellType.WALL) neighbours.add(top);
  if (right != null && right.type != CellType.WALL) neighbours.add(right);
  if (bottom != null && bottom.type != CellType.WALL) neighbours.add(bottom);
  if (left != null && left.type != CellType.WALL) neighbours.add(left);
  
  return neighbours;
}

void pathfinder(Cell start, Cell end) { 
  start.type = CellType.START;
  end.type = CellType.END;
  
  start.g = 0;
  start.h = 0;
  
  ArrayList<Cell> open = new ArrayList<Cell>();
  ArrayList<Cell> closed = new ArrayList<Cell>();
  
  open.add(start);
  
  CELL_END = end;
  CELLS_OPEN = open;
  CELLS_CLOSED = closed;
}

boolean pathfinderLoop(Cell end, ArrayList<Cell> open, ArrayList<Cell> closed) {
  // Sort open list
  Collections.sort(open, new CellComparator());
  // Get the lowest scoring cell, remove it from 'open' and add to 'closed'
  Cell next = open.remove(0);
  closed.add(next);
  
  if (next == end) {
    println("Path Length: " + next.g);
    return true;
  }
  
  next.type = CellType.PATH;
  // For each neighbour
  for (Cell c : getNeighbours(next)) {
    // If c is in the closed list ignore it
    if (closed.indexOf(c) != -1) continue;
    // If c is not in the open list
    if (open.indexOf(c) == -1) {
      // Add it and compute its score
      c.g = next.g + 1;
      c.h = calcHeuristic(c, end);
      c.parent = next;
      open.add(c);
    } else {
      int g = next.g + 1;
      int h = calcHeuristic(c, end);
      if (g + h < c.score()) {
        c.g = g;
        c.h = h;
        c.parent = next;
      }
    }
  }
  
  return false;
}

class Cell {
  
  int i, j;
  int x, y;
  CellType type;
  
  int g;
  int h;
  Cell parent;
  
  Cell(int i, int j, CellType type) {
    this.i = i;
    this.j = j;
    this.type = type;
    
    x = i * CELL_SIZE;
    y = j * CELL_SIZE;
  }
  
  void draw() {
    noStroke();
    switch(type) {
      case WALL:
        fill(0);
        break;
      case START:
        fill(0, 200, 0);
        break;
      case END:
        fill(200, 0, 0);
        break;
      case PATH:
        fill(200, 0, 200);
        break;
      default:
        fill(60);
        break;
    }
    rect(x, y, CELL_SIZE, CELL_SIZE);
  }
  
  int score() {
    return g + h;
  }
  
}

enum CellType {
  OPEN, WALL, START, END, PATH
}

class CellComparator implements Comparator<Cell> {
  public int compare(Cell a, Cell b) {
    return a.score() - b.score();
  }
}