import EmployeeModel from '../models/Employee.js';
import bcrypt from 'bcrypt';

export const importAll = async (req, res) => {
  try {
    const sheetsId = req.params.sheetsId;
    const sheetTitle = 'Sheet1';
    const sheetRange = 'A2:N1000';
    const fullUrl = 'https://docs.google.com/spreadsheets/d/' + sheetsId + '/gviz/tq?sheet=' + sheetTitle + '&range=' + sheetRange;
    
    const response = await fetch(fullUrl);
    const rep = await response.text();
    const data = JSON.parse(rep.substring(47).slice(0, -2));
    
    const employees = [];
    const leaders = {};
    
    for (const employee of data.table.rows) {

      const fullName = employee.c[0].v;
      const status = employee.c[1].v;
      const startOfWork = employee.c[2].v;
      const profession = employee.c[3].v;
      const schedule = employee.c[7].v;
      const email = employee.c[12].v;
      const leader = employee.c[13].v;
      
      const password = 'password' // для тесту
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      try {
        const savedEmployee = await EmployeeModel.create({
            fullName, 
            email,
            status, 
            startOfWork, 
            profession, 
            schedule, 
            leader,
            password: hash,
        })   
        if (!leaders[leader]) {
            leaders[leader] = [];
        }
        leaders[leader].push(savedEmployee);
    
        employees.push(savedEmployee);
      } catch (error) {
        console.log(error);
      }
    }

    employees.forEach(async (employee) => {
      const name = employee.fullName;
      const subordinates = leaders[name] || [];
      
      await EmployeeModel.findByIdAndUpdate(employee._id, { employees: subordinates });
    });

    res.json({
      employees: employees,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Не вдалось імпортувати працівників',
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const employees = await EmployeeModel.find({isAdmin: false}, null, {_id: -1});

    res.json(employees)
  } catch (error) {
    res.status(500).json({
      message: "Не вдалось отримати всіх працівників",
    })
  }
}

export const getOne = async (req, res) => {
  try {
    const employeeId = req.params.id;

    EmployeeModel.findById({_id:employeeId}).then((doc) => {
      if(!doc) {
        return res.status(404).json({message: 'Користувача не знайдено'})
      }
      res.json(doc)
    })
  } catch (error) {
    res.status(500).json({
      message: "Не вдалось отримати працівника",
    })
  }
}

export const removeOne = async (req, res) => {
  try {
    const employeeId = req.params.id;

    EmployeeModel.findByIdAndDelete({_id:employeeId}).then((doc) => {
      if(!doc) {
        return res.status(404).json({message: 'Користувача не знайдено', error: err})
      }
      res.json(doc)
    })
  } catch (error) {
    res.status(500).json({
      message: "Не вдалось видалити працівника",
    })
  }
}

export const updateOne = async (req, res) => {
  try {
    const employeeId = req.params.id;

    EmployeeModel.findByIdAndUpdate({
      _id:employeeId
    }, {
      fullName: req.body.fullName,
      leader: req.body.leader,
      schedule: req.body.schedule,
      status: req.body.status,
      startOfWork: req.body.startOfWork,
      profession: req.body.profession,
      allEducations: req.body.allEducations,
    }).then((doc) => {
      if(!doc) {
        return res.status(404).json({message: 'Користувача не знайдено', error: err})
      }
      res.json(doc)
    })
  } catch (error) {
    res.status(500).json({
      message: "Не вдалось оновити працівника",
    })
  }
}

export const findSome = async (req, res) => {
  try {
    const name = req.params.name;
    const formattedName = name.toLowerCase();

    EmployeeModel.find({ fullName: { $regex: formattedName, $options: "i" } })
      .then((docs) => {
        res.json(docs);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({
          message: "Не вдалось знайти працівника",
        });
      });
  } catch (error) {
    res.status(500).json({
      message: "Не вдалось знайти працівника",
    });
  }
};

export const clearAllEducations = async (req, res) => {
  try {
    const employees = await EmployeeModel.find({ isAdmin: false });

    for (const employee of employees) {
      employee.allEducations = [];
      await employee.save();
    }

    res.json(employees);
  } catch (error) {
    res.status(500).json({
      message: 'Не вдалось очистити навчання працівників',
      error: error.message
    });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const employeeId = req.params.id;
    const updatedEmployeeData = req.body;

    const updatedEmployee = await EmployeeModel.findByIdAndUpdate(
      employeeId,
      updatedEmployeeData,
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Працівника не знайдено' });
    }

    res.json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ message: 'Не вдалось оновити працівника' });
  }
};

export const deleteAllEmployees = async (req, res) => {
  try {
    const employees = await EmployeeModel.deleteMany({ isAdmin: false })
    
    res.json(employees)
  } catch (error) {
    res.status(500).json({
      message: "Не вдалось видалити працівників"
    })
  }
}